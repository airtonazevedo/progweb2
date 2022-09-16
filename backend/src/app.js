
const express = require('express')
const session = require('express-session')
const {v4} = require('uuid')
const produtosController = require('./controllers/produtos')
const authController = require('./controllers/auth')
const app = express()
const port = 3333
const publicRoutes = ['auth', 'produtos']
app.use(express.json());
app.use(session({
  genid: (req) => {
    return v4() // usamos UUIDs para gerar os SESSID
  },
  secret: 'Hi9Cf#mK98',
  resave: false,
  saveUninitialized: true
 }));
app.use((req,res, next) => {
  if(publicRoutes.some(pr => req.url.includes(pr))) {
    next()
  } else if (req.session.uid) {
    next()
  } else {
    res.status(401).send('Não autorizado')
  }
})
app.use(produtosController);
app.use(authController);
app.listen(port, () => {
  console.log(`app rodando na porta ${port}`)
})