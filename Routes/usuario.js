const express = require("express")
const router = express.Router()
const controllerAge = require("../controller/Agenda")
const controllerNot = require("../controller/Noticias")
const Agenda = require("../models/Agenda")
const Noticias = require("../models/Noticias")
const {Usuario} = require("../Config/permissions")

//Get's
    router.get('/Home', Usuario, (req, res) => {
        Agenda.findAll({where:{usuario:req.user.ID}, order: [["createdAt", "DESC"]]}).then(function (agenda) {
            res.render("Usuario/Home",{agenda: agenda,usuario:req.user})
    });
    })
    router.get('/Anotacoes/nova', Usuario, (req, res) => {
            res.render("Usuario/Add_anotacao")
    })
    router.get("/Anotacoes/deletar/:id", Usuario, controllerAge.DestroyOne)
    router.get("/Anotacoes/editar/:id",Usuario, controllerAge.FindOne)
    router.get("/Noticia/nova",Usuario,(req,res)=>{res.render("Marketing/Add_noticia")})
    router.get("/Noticia/editar",Usuario,(req,res)=>{
        Agenda.findAll({where:{usuario:req.user.ID}, order: [["createdAt", "DESC"]]}).then(function (agenda) {
        })
    })
    router.get("/Noticia/:titulo",(req,res)=>{
        res.render("Marketing/Noticia")
    })

//Post's
    router.post('/Anotacoes/nova',Usuario, controllerAge.Create)
    router.post("/Anotacoes/editar/:id",Usuario, controllerAge.Update)
    router.post("/Noticia/nova",Usuario,controllerNot.Create)
    router.post("/Noticia/editar",Usuario,controllerNot.Update)


module.exports = router
