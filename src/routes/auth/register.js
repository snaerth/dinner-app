import auth from '../../services/auth'

export async function post(req, res) {
  const { username, email, password } = req.body
  const { SAPPER_APP_API_BASE_URL } = process.env
  const postData = {
    email,
    password,
    username,
    confirmed: true,
  }

  return auth(
    req,
    res,
    `${SAPPER_APP_API_BASE_URL}/auth/local/register`,
    postData
  )
}
