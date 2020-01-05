import sirv from 'sirv'
import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import sessionFileStore from 'session-file-store'
import compression from 'compression'
import * as sapper from '@sapper/server'

// Register environmental variables from .env file in root of project
require('dotenv').config()
// Setup session file storage located
const FileStore = sessionFileStore(session)
const { PORT, NODE_ENV, SAPPER_APP_SESSION_SECRET } = process.env
const dev = NODE_ENV === 'development'

// Init `sirv` handler
const assets = sirv('static', {
  maxAge: 31536000, // 1Y
  immutable: true,
  dev,
})

const sessionMiddleware = session({
  secret: SAPPER_APP_SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 31536000,
  },
  store: new FileStore({
    path: process.env.NOW ? `/tmp/sessions` : `.sessions`,
  }),
})

function authenticationMiddleware(req, _, next) {
  if (!req.session.isAuthenticated) {
    req.session.isAuthenticated = false
    req.session.jwt = null
    req.session.user = null
  }

  next()
}

express()
  .use(bodyParser.json())
  .use(sessionMiddleware)
  .use(compression({ threshold: 0 }), assets)
  .use(authenticationMiddleware)
  .use(
    sapper.middleware({
      session: req => ({
        jwt: req.session.jwt,
        user: req.session.user,
        isAuthenticated: req.session.isAuthenticated,
      }),
    })
  )
  .listen(PORT, err => {
    if (err) {
      console.log('error', err)
    }
  })
