import axios from 'axios'
import compression from 'compression'
import express from 'express'
import ReactDOM from 'react-dom/server'
import { CLIENT_ID, CLIENT_PWD, SERVER_URL } from '../../config'
import { App } from '../App'
import { indexTemplate } from './indexTemplate'

const PORT = process.env.PORT || 3000
const SERVER = SERVER_URL || 'http://localhost:3000'
const app = express()
app.use(compression())
// не работает
// app.use(helmet({
//    contentSecurityPolicy: false
// }));

app.use('/static', express.static('./dist/client'))

app.get('/auth', (req, res) => {
  axios
    .post(
      'https://www.reddit.com/api/v1/access_token',
      `grant_type=authorization_code&code=${req.query.code}&redirect_uri=${SERVER_URL}/auth`,
      {
        auth: { username: CLIENT_ID, password: CLIENT_PWD },
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      }
    )
    .then(({ data }) => {
      res.send(
        indexTemplate(ReactDOM.renderToString(App()), data['access_token'])
      )
    })
    .catch(console.log)
})

app.get('*', (req, res) => {
  res.send(indexTemplate(ReactDOM.renderToString(App())))
})

app.listen(PORT, () => {
  console.log(`Server started on ${SERVER}`)
})
