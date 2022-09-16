const express = require("express");
const session = require("express-session");
const cors = require("cors");
const produtosController = require("./controllers/produtos");
const authController = require("./controllers/auth");
const app = express();
const port = 3333;
const publicRoutes = ["auth", "produtos"];
const adminRoutes = ["produto/novo"];
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3306", "http://localhost:3021"],
  })
);
app.use(
  session({
    secret: "Keep it secret",
    name: "uniqueSessionID",
    saveUninitialized: false,
  })
);
app.use((req, res, next) => {
  if (publicRoutes.some((pr) => req.url.includes(pr))) {
    return next();
  } else if (req.session.uid) {
    if (adminRoutes.some((pr) => req.url.includes(pr))) {
      if (req.session.userType === 2) {
        return next();
      }
      return res.status(401).send("Não autorizado");
    }
    return next();
  } else {
    return res.status(401).send("Não autorizado");
  }
});
app.use(produtosController);
app.use(authController);
app.listen(port, () => {
  console.log(`app rodando na porta ${port}`);
});
