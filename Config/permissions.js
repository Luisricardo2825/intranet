const Usuarios = require("../models/Usuarios");
const cli = require("cli-color");

module.exports = {
    admin: (req, res, next) => {
        const project = Usuarios.findOne({ where: { ID: req.user.ID } })
            .then((data) => { 

        if (req.isAuthenticated() && req.user.admin == 1 && data != null) {

            return next();
        }
        else {
            req.flash("error_msg", "Necessario ter permissões root/Admin")
            res.redirect("/logout")
        
                }
            }).catch(err => {
            console.log(err)
       });
    },
    Usuario:(req, res, next)=>{
       
        const project = Usuarios.findOne({ where: { ID: req.user.ID } })
            .then((data) => { 

            if (req.isAuthenticated() && data != null) {
    
                return next();
            }
            else {
                req.flash("error_msg", "É necessario estar logado para acessar esta página")
                res.redirect("/logout")
            }})
            .catch(err => {
                console.log(err)
           });
    }
}
