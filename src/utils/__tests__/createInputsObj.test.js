import '@testing-library/jest-dom/extend-expect'
import createInputsObj from '../createInputsObj'

test('failes creating inputs since param is not array of strings', () => {
  expect(createInputsObj('email')).toBeNull()
})

test('creates inputs object for email and password', () => {
  expect(createInputsObj(['email', 'password'])).toEqual({
    email: {
      value: '',
      error: '',
      isDirty: false,
      shake: false,
    },
    password: {
      value: '',
      error: '',
      isDirty: false,
      shake: false,
    }
  })
})