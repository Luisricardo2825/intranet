const express = require("express");
const router = express.Router();
const controllerAge = require("../controller/Agenda");
const controllerNot = require("../controller/Noticias");
const Agenda = require("../models/Agenda");
const Noticias = require("../models/Noticias");
const { Usuario } = require("../Config/permissions");
var Data = require("../Config/Date");

//Get's
router.get("/Home", Usuario, (req, res) => {
    Agenda.findAll({ where: { usuario: req.user.ID }, order: [["dataFin", "ASC"]] }).then(function (agenda) {
        res.render("Usuario/Home", { agenda: agenda, usuario: req.user });
    });
});
router.get("/Configuracoes/:id", Usuario, (req, res) => {
    res.render("usuario/configuracoes");
});
router.get("/Anotacoes/nova", Usuario, (req, res) => {
    res.render("Usuario/Add_anotacao");
});
router.get("/Anotacoes/deletar/:id", Usuario, controllerAge.DestroyOne);
router.get("/Anotacoes/editar/:id", Usuario, controllerAge.FindOne);
router.get("/Marketing", Usuario, (req, res) => {
    Noticias.findAll().then(function (noticias) {
        res.render("Marketing/Home", { noticias: noticias });
    });
});
router.get("/Marketing/Noticia/nova", Usuario, (req, res) => {
    res.render("Marketing/Add_noticia");
});
router.get("/Marketing/Noticia/editar", Usuario, (req, res) => {
    Agenda.findAll({ where: { usuario: req.user.ID }, order: [["ID", "DESC"]] }).then(function (agenda) {});
});
router.get("/Marketing/Noticia/:id", controllerNot.FindOne);

//Post's
router.post("/Anotacoes/nova", Usuario, controllerAge.Create);
router.post("/Anotacoes/editar/:id", Usuario, controllerAge.Update);
router.post("/Marketing/Noticia/nova", Usuario, controllerNot.Create);
router.post("/Marketing/Noticia/editar", Usuario, controllerNot.Update);

module.exports = router;
