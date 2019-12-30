import sirv from 'sirv'
import express from 'express'
import bodyParser from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import compression from 'compression'
import * as sapper from '@sapper/server'

const FileStore = sessionFileStore(session);
const { PORT, NODE_ENV, SESSION_SECRET } = process.env
const dev = NODE_ENV === 'development'

express()
  .use(bodyParser.json())
    .use(session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 31536000
      },
      store: new FileStore({
        path: process.env.NOW ? `/tmp/sessions` : `.sessions`
      })
    }))
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
			session: req => ({
				user: req.session && req.session.user
			})
		})
  )
  .listen(PORT, err => {
    if (err) {
      console.log('error', err)
    }
  })
