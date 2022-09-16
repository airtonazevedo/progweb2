const express = require("express");
const yup = require("yup");
const { Usuario } = require("../models/index");
const routes = express.Router();
const bcrypt = require('bcryptjs');
routes.post("/usuario/novo", async (req, res) => {
  try {
    let schema = yup.object().shape({
      nome: yup.string().required(),
      email: yup.string().required(),
      senha: yup.string().required().min(6),
      senhaConfirmacao: yup
        .string()
        .oneOf([yup.ref("senha"), null], "Passwords must match"),
    });

    await schema.validate(req.body);
    const hash = await bcrypt.hash(req.body.senha, 10);
    await Usuario.create({
      nome: req.body.nome,
      email: req.body.email,
      senha: hash,
      tipoUsuarioId: 2,
    });

    return res.status(201).send("Conta criada");
  } catch (err) {
    console.log(err)
    if (err instanceof yup.ValidationError) {
      res.status(400).send(err.message);
    } else if (err.errors instanceof Array && err.errors[0].message)
      res.status(400).send(err.errors[0].message);
  }
});

module.exports = routes;
