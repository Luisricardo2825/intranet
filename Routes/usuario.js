const express = require("express")
const router = express.Router()
const controllerAge = require("../controller/Agenda")
const passport = require("passport")
const Agenda = require("../models/Agenda")
const {Usuario} = require("../Config/permissions")

router.get('/Home', Usuario, (req, res) => {
    Agenda.findAll({where:{usuario:req.user.ID}}).then(function (agenda) {
        res.render("Usuario/Home",{agenda: agenda,usuario:req.user})
    });
})
router.get('/Anotacoes/nova', Usuario, (req, res) => {
          res.render("Usuario/Add_anotacao")
})
router.get("/Anotacoes/deletar/:id", Usuario, controllerAge.DestroyOne)

router.get("/Anotacoes/editar/:id",Usuario, controllerAge.FindOne)

router.post('/Anotacoes/nova',Usuario, controllerAge.Create,(req,res)=>{
})
router.post("/Anotacoes/editar/:id",Usuario, controllerAge.Update)


module.exports = router
