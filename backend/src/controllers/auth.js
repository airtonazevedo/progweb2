const express = require('express');
const yup = require('yup')
const { Usuario } = require('../models/index')
const bcrypt = require('bcryptjs');
const routes = express.Router();

const saltRounds = 10;
routes.post('/auth/signin', async (req, res) => {

  try {

    let schema = yup.object().shape({
        email: yup.string().required(),
        senha: yup.string().required(),
      })
    

    await schema.validate(req.body);
    
    const user = await Usuario.findOne({ where: { email: req.body.email } });
    if (user) {
      const result = await bcrypt.compare(req.body.senha, user.senha)
      if (result) {
        req.session.uid = user.id;
        req.session.userType = user.tipoUsuarioId
        return res.send({id:user.id, type: user.tipoUsuarioId});
      } 
    } 
    throw 'Email ou senha inválidos'
    
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }

})
routes.post('/auth/signup', async (req, res) => {

  try {

    let schema = yup.object().shape({
        nome: yup.string().required(),
        email: yup.string().required(),
        senha: yup.string().required().min(6),
        senhaConfirmacao: yup.string().oneOf([yup.ref('senha'), null], 'Passwords must match')
      })
    

    await schema.validate(req.body);
    const hash = await bcrypt.hash(req.body.senha, saltRounds)
    await Usuario.create({nome: req.body.nome, email: req.body.email, senha: hash, tipoUsuarioId: 1});
    
    return res.status(201).send("Conta criada");
    
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      res.status(400).send(err.message)
    } else if (err.errors instanceof Array && err.errors[0].message)
      res.status(400).send(err.errors[0].message)
  }

})
routes.post('/auth/validate', async (req, res) => {
  if (!!req.session.uid) {
    const user = await Usuario.findOne({ where: { id: req.session.uid } });
    return res.send({id:user.id, type: user.tipoUsuarioId});
  } else {
    return res.status(400).send({ok:false})
  }

})
routes.post('/auth/logout', async (req, res) => {
  req.session.destroy((err) => {
    res.send({msg: "Logout realizado com sucesso"});
  });
})

module.exports = routes;