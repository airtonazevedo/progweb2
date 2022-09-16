const express = require('express');
const yup = require('yup')
const { Produto } = require('../models/index')
const routes = express.Router();

routes.post('/produtos', async (req, res) => {

  try {

    let schema = yup.array().of(
      yup.object().shape({
        name: yup.string().required(),
        cpf: yup.string().required().length(14),
        email: yup.string().email(),
        gender_id: yup.number().min(1).max(2).integer(),
        marital_status_id: yup.number().min(1).max(6).integer(),
        birth_date: yup.date().required()
      })
    )

    const validate = await schema.validate(req.body);

    
    res.send(validate);
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }

})

routes.get('/produtos', async (req, res) => {
  console.log(Produto)
  await Produto.create({
    nome:'SSD 512',
    preco:543.00,
    estoque:5
   });
  res.send('produtos')

})

module.exports = routes;