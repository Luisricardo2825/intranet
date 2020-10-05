const express = require("express");
const router = express.Router();
const controllerAge = require("../controller/Agenda");
const controllerNot = require("../controller/Noticias");
const Noticias = require("../models/Noticias");
const { Usuario } = require("../Config/permissions");
var Data = require("../Config/Date");

//Get's
router.get("/Home", Usuario, (req, res) => {
 controllerAge.FindAll(req,res).then((result)=>{
        res.render("Usuario/Home", { agenda: result, usuario: req.user });
    })
});

router.get("/Configuracoes/:id", Usuario, (req, res) => {
    res.render("usuario/configuracoes");
});

router.get("/Anotacoes/nova", Usuario, (req, res) => {
    res.render("Usuario/Add_anotacao");
});

router.get("/Anotacoes/deletar/:id", Usuario, controllerAge.DestroyOne);

router.get("/Anotacoes/editar/:id", Usuario, (req, res) => {
    controllerAge.FindOne(req, res).then((result) => {
        res.render("usuario/editar_anotacao", { data: result });
    })
});

router.get("/Marketing", Usuario, (req, res) => {
    Noticias.findAll().then(function (noticias) {
        res.render("Marketing/Home", { noticias: noticias });
    });
});

router.get("/Marketing/Noticia/nova", Usuario, (req, res) => {
    res.render("Marketing/Add_noticia");
});

router.get("/Marketing/Noticia/editar/:id", Usuario, controllerNot.FindOne);

router.get("/Marketing/Noticia/deletar/:id", Usuario, controllerNot.DestroyOne);

router.get("/Marketing/Noticia/:id", controllerNot.MaisDetalhes);

//Post's
router.post("/Anotacoes/nova", Usuario, controllerAge.Create);
router.post("/Anotacoes/editar/:id", Usuario, controllerAge.Update);
router.post("/Marketing/Noticia/nova", Usuario, controllerNot.Create);
router.post("/Marketing/Noticia/editar/:id", Usuario, controllerNot.Update);

module.exports = router;
