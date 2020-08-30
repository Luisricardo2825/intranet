const express = require("express")
const router = express.Router()
const controllerUsu = require("../controller/Usuarios")
const passport = require("passport")
const {Usuario} = require("../Config/permissions")

router.get('/Home',Usuario, (req, res) => {
    res.render("Usuario/Home",{usuario:req.user})
})


module.exports = router
