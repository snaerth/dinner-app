/**
 * Checks if user is authenticated
 * @param {Object} session Sapper session object
 */
export default function authenticated(session) {
  const { isAuthenticated, user, jwt } = session

  if (user && isAuthenticated && jwt) {
    return true
  }

  return false
}
