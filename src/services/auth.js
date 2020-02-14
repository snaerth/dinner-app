import HttpStatus from 'http-status-codes'
import serialize from 'serialize-javascript'
import { post as request } from './http'
import { internalServerErrorMsg} from '../constants/errors'

async function auth(req, res, url, postData) {
  try {
    const response = await request(url, postData)

    if (response.code === 'ECONNREFUSED') {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(internalServerErrorMsg)
    }

    const { data } = response

    if (data.user && data.jwt) {
      // Store user and jwt in server session
      req.session.user = data.user
      req.session.jwt = data.jwt
      req.session.isAuthenticated = true
    }

    res.setHeader('Content-Type', 'application/json')

    return res.end(serialize(data))
  } catch (error) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send(internalServerErrorMsg)
  }
}

export default auth