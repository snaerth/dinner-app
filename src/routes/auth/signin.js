import auth from '../../services/auth'

const { SAPPER_APP_API_BASE_URL } = process.env

export async function post(req, res) {
  const { email, password } = req.body
  const postData = {
    identifier: email,
    password,
  }

  return auth(req, res, `${SAPPER_APP_API_BASE_URL}/auth/local`, postData)
}
