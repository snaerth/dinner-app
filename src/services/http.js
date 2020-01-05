import axios from 'axios'
import { DEFAULT_HEADERS } from '../constants/headers'

/**
 * Axios post request helper wrapper
 * @param {string} url endpoint
 * @param {object} data request payload
 * @returns {object} axios response object
 */
export async function post(url, data) {
  const response = await axios({
    method: 'POST',
    url,
    headers: DEFAULT_HEADERS,
    data,
  })

  return response
}
