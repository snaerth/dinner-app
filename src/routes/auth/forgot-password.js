import auth from '../../services/auth'

const { SAPPER_APP_API_BASE_URL, SAPPER_APP_BASE_DOMAIN } = process.env

export async function post(req, res) {
  const { email } = req.body
  const postData = {
    email,
    url: `${SAPPER_APP_BASE_DOMAIN}/reset-password`,
  }

  return auth(
    req,
    res,
    `${SAPPER_APP_API_BASE_URL}/auth/forgot-password`,
    postData
  )
}
