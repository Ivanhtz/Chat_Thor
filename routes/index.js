var express = require("express");
var router = express.Router();
const Mensaje = require("../models/mensaje.model");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/chat", async (req, res) => {
  /**
   * -Requerimos el modelo de mensaje para usarlo
   * -Recuperar de la BD los últimos 5 mensajes (aggregate -> $sort, $limit)
   * -Le paso el array de mesnajes a la vista a través del método render
   * -Dentro de la vista (chat.pug) recorrer el array y mostrar los mensajes dentro del UL
   */
  const mensajes = await Mensaje.aggregate([
    { $sort: { createdAt: -1 } },
    { $limit: 5 },
  ]);

  res.render("chat", { mensajes: mensajes.reverse() });
});

module.exports = router;
