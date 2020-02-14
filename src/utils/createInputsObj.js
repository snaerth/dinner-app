/**
 * Creates Inputs object with default input object from given keys in array
 * @param {Array<string>} keys object property keys
 * @returns {object}
 */
function createInputsObj(keys) {
  if (!Array.isArray(keys)) {
    return null
  }

  const set = new Set(keys)
  const obj = {}

  set.forEach(key => {
    obj[key] = {
      value: '',
      error: '',
      isDirty: false,
      shake: false,
    }
  })

  return obj
}

export default createInputsObj
