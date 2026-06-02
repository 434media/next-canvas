import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getFirestore, type Firestore } from "firebase-admin/firestore"

/**
 * Firestore database id for Digital Canvas form data.
 * All form submissions across the application persist into this database.
 */
export const DATABASE_ID = "digitalcanvas"

let cachedDb: Firestore | null = null

/**
 * Returns the firebase-admin Firestore instance bound to the `digitalcanvas`
 * named database. Initializes the firebase-admin app on first call using the
 * GOOGLE_SERVICE_ACCOUNT_KEY env var.
 *
 * Use this helper from any API route that needs to persist form data — all
 * writes will land in the same Digital Canvas database, regardless of which
 * collection they target.
 */
export function getDigitalCanvasDb(): Firestore {
  if (cachedDb) return cachedDb

  if (getApps().length === 0) {
    const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    if (!raw) {
      throw new Error(
        "GOOGLE_SERVICE_ACCOUNT_KEY is not configured. Firestore writes will fail."
      )
    }
    const serviceAccount = parseServiceAccountKey(raw)
    initializeApp({ credential: cert(serviceAccount) })
  }

  cachedDb = getFirestore(DATABASE_ID)
  return cachedDb
}

/**
 * Robust JSON parse for the service account key env var.
 *
 * The common failure mode is "Bad control character in string literal in JSON":
 * the raw value contains literal newlines (or carriage returns / tabs) inside
 * a string value — typically the `private_key` field — that JSON.parse rejects.
 * This happens when the user pastes the full service account JSON into
 * `.env.local` with the original line breaks preserved instead of the JSON
 * `\n` escape sequence.
 *
 * We try the raw value first (works when escapes are already correct), and
 * fall back to walking the string and escaping any control chars that appear
 * inside a string literal before retrying. The walker preserves JSON
 * structural whitespace, so pretty-printed JSON between fields still parses.
 */
function parseServiceAccountKey(raw: string): Record<string, unknown> {
  try {
    return JSON.parse(raw) as Record<string, unknown>
  } catch {
    let escaped = ""
    let inString = false
    let escapeNext = false
    for (let i = 0; i < raw.length; i++) {
      const ch = raw[i]
      if (escapeNext) {
        escaped += ch
        escapeNext = false
        continue
      }
      if (ch === "\\") {
        escaped += ch
        escapeNext = true
        continue
      }
      if (ch === '"') {
        escaped += ch
        inString = !inString
        continue
      }
      if (inString) {
        if (ch === "\n") { escaped += "\\n"; continue }
        if (ch === "\r") { escaped += "\\r"; continue }
        if (ch === "\t") { escaped += "\\t"; continue }
      }
      escaped += ch
    }
    return JSON.parse(escaped) as Record<string, unknown>
  }
}
