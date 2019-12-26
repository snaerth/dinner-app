import '@testing-library/jest-dom/extend-expect'
import { emailValidate, passwordValidate } from '../validations'

// Email tests
test('email with no name after @ symbol', () => {
  expect(emailValidate('snaer@.com')).toBe(false)
})

test('email with no name before @ symbol', () => {
  expect(emailValidate('@test.com')).toBe(false)
})

test('email with no domain is invalid', () => {
  expect(emailValidate('snaer@test')).toBe(false)
})

test('email cant be longer than 254 characters', () => {
  expect(emailValidate('snaerseljanthoroddssonsnaerseljanthoroddssonsnaerseljanthoroddssonsnaerseljanthoroddssonsnaerseljanthoroddssonsnaerseljanthoroddssonsnaerseljanthoroddssonsnaerseljanthoroddssonsnaerseljanthoroddssonsnaerseljanthoroddssonsnaerseljanthoroddssonsnae@test.com')).toBe(false)
})

test('email first part cant be longer than 64 characters', () => {
  expect(emailValidate('snaerseljanthoroddssonsnaerseljanthoroddssonsnaerseljanthoroddsso@test.com')).toBe(false)
})


test('email domain part cant be longer than 63 characters', () => {
  expect(emailValidate('test@snaerseljanthoroddssonsnaerseljanthoroddssonsnaerseljanthoroddss.com')).toBe(false)
})

test('email is valid', () => {
  expect(emailValidate('snaerth@gmail.com')).toBe(true)
})

// Password tests
test('password should at least be 8 characters', () => {
  expect(passwordValidate('iamapas')).toBe(false)
  expect(passwordValidate('iamapassword')).toBe(true)
})

test('password should be no longer than 100 characters', () => {
  expect(passwordValidate('snaerseljanthoroddssonsnaerseljanthoroddssonsnaerseljanthoroddssosnaerseljanthoroddssonsnaerseljanth')).toBe(true)
  expect(passwordValidate('snaerseljanthoroddssonsnaerseljanthoroddssonsnaerseljanthoroddssosnaerseljanthoroddssonsnaerseljanth11')).toBe(false)
})