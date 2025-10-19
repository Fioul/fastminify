import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const LOGS_DIR = path.join(process.cwd(), 'logs')
const CONSENT_LOG_FILE = path.join(LOGS_DIR, 'consent-logs.json')

interface ConsentLog {
  id: string
  ip: string
  userAgent: string
  timestamp: string
  choices: {
    necessary: boolean
    analytics: boolean
    advertising: boolean
  }
  version: string
  source: string
  expires: string // 3 years from timestamp
}

// Ensure logs directory exists
async function ensureLogsDir() {
  if (!existsSync(LOGS_DIR)) {
    await mkdir(LOGS_DIR, { recursive: true })
  }
}

// Read existing logs
async function readConsentLogs(): Promise<ConsentLog[]> {
  try {
    if (!existsSync(CONSENT_LOG_FILE)) {
      return []
    }
    const data = await readFile(CONSENT_LOG_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading consent logs:', error)
    return []
  }
}

// Write logs to file
async function writeConsentLogs(logs: ConsentLog[]) {
  try {
    await ensureLogsDir()
    await writeFile(CONSENT_LOG_FILE, JSON.stringify(logs, null, 2))
  } catch (error) {
    console.error('Error writing consent logs:', error)
  }
}

// Get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return request.ip || 'unknown'
}

// Generate unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Calculate expiration date (3 years from now)
function calculateExpiration(): string {
  const expiration = new Date()
  expiration.setFullYear(expiration.getFullYear() + 3)
  return expiration.toISOString()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { choices, source = 'cookie-banner' } = body

    if (!choices || typeof choices !== 'object') {
      return NextResponse.json(
        { error: 'Invalid choices provided' },
        { status: 400 }
      )
    }

    // Create consent log entry
    const consentLog: ConsentLog = {
      id: generateId(),
      ip: getClientIP(request),
      userAgent: request.headers.get('user-agent') || 'unknown',
      timestamp: new Date().toISOString(),
      choices: {
        necessary: choices.necessary ?? true,
        analytics: choices.analytics ?? false,
        advertising: choices.advertising ?? true
      },
      version: '1.0',
      source,
      expires: calculateExpiration()
    }

    // Read existing logs
    const existingLogs = await readConsentLogs()
    
    // Add new log
    existingLogs.push(consentLog)
    
    // Write updated logs
    await writeConsentLogs(existingLogs)

    return NextResponse.json({ 
      success: true, 
      id: consentLog.id 
    })

  } catch (error) {
    console.error('Error logging consent:', error)
    return NextResponse.json(
      { error: 'Failed to log consent' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ip = searchParams.get('ip')
    
    // Read existing logs
    const logs = await readConsentLogs()
    
    // Filter by IP if provided
    const filteredLogs = ip ? logs.filter(log => log.ip === ip) : logs
    
    // Return logs (without sensitive data in production)
    const isDevelopment = process.env.NODE_ENV === 'development'
    
    const responseLogs = isDevelopment 
      ? filteredLogs 
      : filteredLogs.map(log => ({
          id: log.id,
          timestamp: log.timestamp,
          choices: log.choices,
          version: log.version,
          source: log.source,
          expires: log.expires
        }))

    return NextResponse.json({ 
      logs: responseLogs,
      count: filteredLogs.length 
    })

  } catch (error) {
    console.error('Error reading consent logs:', error)
    return NextResponse.json(
      { error: 'Failed to read consent logs' },
      { status: 500 }
    )
  }
}
