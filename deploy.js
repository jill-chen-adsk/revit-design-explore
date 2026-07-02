/**
 * deploy.js  —  Deploy revit-phase-demo.html to Vercel via REST API
 * Node.js 18+ required (uses built-in fetch). No npm install needed.
 *
 * Usage:
 *   node deploy.js <VERCEL_TOKEN>
 *
 * Get a token at: https://vercel.com/account/tokens
 */

import { readFileSync, existsSync, writeFileSync } from 'fs'
import { createHash }                              from 'crypto'
import { createInterface }                         from 'readline'
import { fileURLToPath }                           from 'url'
import { dirname, join }                           from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))

const PROJECT_NAME = 'revit-design-explore'
const TEAM_ID      = 'team_7boC9YHghoZFLGfgJEOLP4Nj'
const HTML_FILE    = 'revit-phase-demo.html'
const ENV_FILE     = join(__dir, '.vercel-token')

// ── Token resolution ─────────────────────────────────────────────────────────

async function getToken() {
  // 1. CLI argument
  if (process.argv[2]) return process.argv[2].trim()

  // 2. Cached token file
  if (existsSync(ENV_FILE)) {
    const t = readFileSync(ENV_FILE, 'utf8').trim()
    if (t) { console.log('Using cached token from .vercel-token'); return t }
  }

  // 3. Prompt interactively
  console.log('\n  No token found.')
  console.log('  ➜ Open this URL in your browser, create a token, then paste it here:')
  console.log('    https://vercel.com/account/tokens\n')

  const rl = createInterface({ input: process.stdin, output: process.stdout })
  const token = await new Promise(res => rl.question('  Paste Vercel token: ', ans => { rl.close(); res(ans.trim()) }))

  if (!token) { console.error('No token provided. Aborting.'); process.exit(1) }

  // Save for next time
  writeFileSync(ENV_FILE, token, 'utf8')
  console.log(`  Token saved to .vercel-token (do not commit this file)\n`)
  return token
}

// ── Vercel API helpers ────────────────────────────────────────────────────────

async function api(token, method, path, body) {
  const url = `https://api.vercel.com${path}${TEAM_ID ? '?teamId=' + TEAM_ID : ''}`
  const res = await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type':  'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = await res.json()
  if (!res.ok) {
    console.error('Vercel API error:', JSON.stringify(json, null, 2))
    process.exit(1)
  }
  return json
}

// Upload a single file (returns sha)
async function uploadFile(token, content) {
  const sha = createHash('sha1').update(content).digest('hex')
  const url = `https://api.vercel.com/v2/files?teamId=${TEAM_ID}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization':    `Bearer ${token}`,
      'Content-Type':     'application/octet-stream',
      'Content-Length':   Buffer.byteLength(content).toString(),
      'x-vercel-digest':  sha,
    },
    body: content,
  })
  // 200 = uploaded, 204 = already exists — both are fine
  if (res.status !== 200 && res.status !== 204) {
    const text = await res.text()
    console.error('File upload error:', res.status, text)
    process.exit(1)
  }
  return sha
}

// Resolve or create the Vercel project
async function ensureProject(token) {
  try {
    const proj = await api(token, 'GET', `/v9/projects/${PROJECT_NAME}`)
    console.log(`  Found existing project: ${proj.name} (${proj.id})`)
    return proj.id
  } catch {}

  console.log(`  Creating new project: ${PROJECT_NAME}`)
  const proj = await api(token, 'POST', '/v10/projects', {
    name: PROJECT_NAME,
    framework: null,
  })
  return proj.id
}

// Poll deployment until ready
async function waitForDeployment(token, deploymentId) {
  const states = ['BUILDING', 'INITIALIZING', 'QUEUED']
  let elapsed = 0
  process.stdout.write('  Building')
  while (elapsed < 180) {
    await new Promise(r => setTimeout(r, 3000))
    elapsed += 3
    const d = await api(token, 'GET', `/v13/deployments/${deploymentId}`)
    if (d.readyState === 'READY') {
      process.stdout.write(' ✓\n')
      return d
    }
    if (d.readyState === 'ERROR' || d.readyState === 'CANCELED') {
      process.stdout.write(' ✗\n')
      console.error('  Deployment failed:', d.readyState)
      process.exit(1)
    }
    process.stdout.write('.')
  }
  console.error('\n  Timed out waiting for deployment')
  process.exit(1)
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n  ╔══════════════════════════════════════╗')
  console.log('  ║  Revit Phase Demo — Vercel Deploy    ║')
  console.log('  ╚══════════════════════════════════════╝\n')

  const token = await getToken()

  // Verify token
  const me = await api(token, 'GET', '/v2/user')
  console.log(`  Authenticated as: ${me.user.email}\n`)

  // Read HTML file
  const htmlPath = join(__dir, HTML_FILE)
  if (!existsSync(htmlPath)) {
    console.error(`  File not found: ${htmlPath}`)
    process.exit(1)
  }
  const htmlContent = readFileSync(htmlPath, 'utf8')
  const htmlBytes   = Buffer.from(htmlContent, 'utf8')
  console.log(`  File: ${HTML_FILE} (${(htmlBytes.length / 1024).toFixed(1)} KB)`)

  // Upload file
  process.stdout.write('  Uploading file...')
  const sha = await uploadFile(token, htmlBytes)
  process.stdout.write(' done\n')

  // Create deployment
  process.stdout.write('  Creating deployment...')
  const deployment = await api(token, 'POST', '/v13/deployments', {
    name:  PROJECT_NAME,
    files: [
      {
        file: 'index.html',
        sha,
        size: htmlBytes.length,
      }
    ],
    projectSettings: {
      framework:        null,
      buildCommand:     null,
      installCommand:   null,
      outputDirectory:  null,
    },
    target: 'production',
  })
  process.stdout.write(' done\n')
  console.log(`  Deployment ID: ${deployment.id}`)

  // Wait for it to go live
  const ready = await waitForDeployment(token, deployment.id)

  const url = `https://${ready.url}`
  console.log('\n  ┌──────────────────────────────────────────┐')
  console.log(`  │  ✅  Live at: ${url}`)
  console.log('  └──────────────────────────────────────────┘\n')

  // Open in browser
  const { execSync } = await import('child_process')
  try { execSync(`start ${url}`) } catch {}
}

main().catch(err => { console.error(err); process.exit(1) })
