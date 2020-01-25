import HttpStatus from 'http-status-codes'
import serialize from 'serialize-javascript'
import { post as signIn } from '../../services/http'

const internalServerErrorMsg = "Sorry. It's not you. It's us. We're experencing an internal server problem. Please try again later."

export async function post(req, res) {
  try {
    const { email, password } = req.body
    const { SAPPER_APP_API_BASE_URL } = process.env

    // Make sign in request to API
    const response = await signIn(`${SAPPER_APP_API_BASE_URL}/auth/local`, {
      identifier: email,
      password: password,
    })

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
