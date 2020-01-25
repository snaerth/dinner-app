/**
 * Checks if browser or server
 * @returns {boolean}
 */
export default function isBrowser() {
  return typeof window !== 'undefined' ? true : false
}
