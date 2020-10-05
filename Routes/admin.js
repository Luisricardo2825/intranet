//Essa é a rota para admin

const express = require("express");
const router = express.Router(); //Informa que este arquivo é um grupo de rotas a ser chamado no app.js
const Usuarios = require("../models/Usuarios"); //"Importando" o modelo da tabela de dados usuarios
const controllerUsu = require("../controller/Usuarios"); //"Importando" o controller de usuarios(Responsável por fazer comunicação com a estrutura da tabela usuarios)
const { admin } = require("../Config/permissions"); //"Importando" a validação das permissões
const { Usuario } = require("../Config/permissions");

router.get("/", admin, (req, res) => {
    res.render("admin/index");
});

router.get("/usuarios", admin, Usuario, (req, res) => {
    controllerUsu.FindAll(req, res).then((result) => {
        res.render("admin/usuarios", { usuarios: result });
    });
});
router.get("/usuarios/deletar/:id", admin, Usuario, controllerUsu.DestroyOne);

router.get("/usuarios/editar/:id", admin, Usuario, (req, res) => {
    controllerUsu.FindOne(req, res).then((result) => {
        res.render("admin/editar", { data: result });
    });
});

// Post's
router.post("/usuarios/editar/:id", admin, Usuario, controllerUsu.Update);

module.exports = router;
