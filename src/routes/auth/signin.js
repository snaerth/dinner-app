import serialize from 'serialize-javascript'
import { post as signIn } from '../../services/http'

export async function post(req, res) {
  try {
    const { email, password } = req.body
    const { SAPPER_APP_SESSION_SECRET } = process.env

    // Make sign in request to API
    const { data } = await signIn(`${SAPPER_APP_SESSION_SECRET}/auth/local`, {
      identifier: email,
      password: password,
    })

    if (data.user && data.jwt) {
      // Store user and jwt in server session
      req.session.user = data.user
      req.session.jwt = data.jwt
      req.session.isAuthenticated = true
    }

    res.setHeader('Content-Type', 'application/json')
    res.end(serialize(data))
  } catch (error) {
    res.end('Internal Server Error')
  }
}
