import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Basic email format check.
 *
 * The domain labels use `[^\s@.]` (dot excluded) so the pattern is linear and
 * cannot backtrack — avoids the polynomial ReDoS that a naive
 * `[^\s@]+\.[^\s@]+` produces on inputs like `a@a.a.a.a…`.
 */
export function isValidEmail(email: string): boolean {
  if (email.length > 254) return false
  return /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(email)
}