const express = require("express");
const yup = require("yup");
const { Compra, CompraItem } = require("../models/index");
const routes = express.Router();
const { Op } = require("sequelize");

routes.post("/compra/novo", async (req, res) => {
  try {
    const { dataValues } = await Compra.create({
      data: new Date(),
      usuarioId: req.session.uid,
    });
    await CompraItem.bulkCreate(req.body.carrinho.map(i => ({
      compraId: dataValues.id,
      produtoId: i.id,
      quantidade: i.quantidade
    })));
    return res.status(201).send("Compra finalizada");
  } catch (err) {
    console.log(err)
    if (err instanceof yup.ValidationError) {
      res.status(400).send(err.message);
    } else if (err.errors instanceof Array && err.errors[0].message)
      res.status(400).send(err.errors[0].message);
    res.status(400).send(err);
  }
});

module.exports = routes;
