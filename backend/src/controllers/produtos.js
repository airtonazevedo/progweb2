const express = require("express");
const yup = require("yup");
const { Produto } = require("../models/index");
const routes = express.Router();
const { Op } = require("sequelize");

routes.post("/produto/novo", async (req, res) => {
  try {

    let schema = yup.object().shape({
      nome: yup.string().required(),
      preco: yup.number().required(),
      estoque: yup.number().required().positive().integer(),
    });

    await schema.validate(req.body);
    await Produto.create(req.body);
    return res.status(201).send("Produto criado");
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      res.status(400).send(err.message);
    } else if (err.errors instanceof Array && err.errors[0].message)
      res.status(400).send(err.errors[0].message);
  }
});

routes.get("/produtos", async (req, res) => {
  let search = req.query.search
  let offset = 0
  if (!search)
    search = ''
  if (req.query.offset)
    offset = Number(req.query.offset)
  const produtos = await Produto.findAndCountAll({
    where: {
      nome: {
        [Op.like]: `%${search}%`
      }
    },
    offset: offset,
    limit: 10
  });
  res.send(produtos);
});

module.exports = routes;
