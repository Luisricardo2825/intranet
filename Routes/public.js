const express = require("express")
const router = express.Router()
const controllerUsu = require("../controller/Usuarios")
const passport = require("passport")

router.get('/registrar', (req, res) => {
    res.render("Public/registro")
})

router.get('/login', (req, res) => {
    res.render("Public/login")
})

//Posts
router.post('/registrar', controllerUsu.Create)

router.post('/login', (req, res, next) => {
   
    //Faz a autenticação do login
    passport.authenticate("local", {
        successRedirect: "/Usuario/Home",
        failureRedirect: "/login",
        successFlash:true,
        failureFlash: true,
        badRequestMessage: "Preencha todos os campos"  
    })(req, res, next)

})

module.exports = router
