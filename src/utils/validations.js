const emailTester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/ // eslint-disable-line

/**
 * Validates if email is on right format
 * Thanks to:
 * @url http://fightingforalostcause.net/misc/2006/compare-email-regex.php
|* @url http://thedailywtf.com/Articles/Validating_Email_Addresses.aspx
 * @url http://stackoverflow.com/questions/201323/what-is-the-best-regular-expression-for-validating-email-addresses/201378#201378
 *
 * @param {string} email - Email string
 * @returns {boolean}
 */
export function emailValidate(email) {
  if (!email || email.length > 254) {
    return false
  }

  const valid = emailTester.test(email)

  if (!valid) {
    return false
  }

  // Further checking of some things regex can't handle
  const parts = email.split('@')

  if (parts[0].length > 64) {
    return false
  }

  const domainParts = parts[1].split('.')

  if (domainParts.some(part => part.length > 63)) {
    return false
  }

  return true
}

/**
 * Validates password. The only rule is that password
 * must be at least 8 characters and no longer than 100
 *
 * @param {string} password
 * @returns {boolean}
 */
export function passwordValidate(password) {
  if (password.length < 8 || password.length > 100) {
    return false
  }

  return true
}

/**
 * Validates username. The only rule is that the username
 * must be at least 3 characters and no longer than 100
 *
 * @param {string} password
 * @returns {boolean}
 */
export function usernameValidate(username) {
  if (username.length < 3 || username.length > 100) {
    return false
  }

  return true
}
