import axios from 'axios'
import { DEFAULT_HEADERS } from '../constants/headers'

/**
 * Axios post request helper wrapper
 * @param {string} url endpoint
 * @param {object} data request payload
 * @returns {Promise} axios promise with response object
 */
export function post(url, data) {
  return axios({
    method: 'POST',
    url,
    headers: DEFAULT_HEADERS,
    data,
  })
    .then(response => response)
    .catch(error => error.response)
}
