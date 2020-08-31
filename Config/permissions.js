const Usuario = require("../models/Usuarios");
const cli = require("cli-color");

module.exports = {
    admin: (req, res, next)=>{
        if (req.isAuthenticated() && req.user.admin == 1) {

            return next();
        }
        else {
            req.flash("error_msg", "Necessario ter permissões root/Admin")
            res.redirect("/")
        }
    },
    Usuario:(req, res, next)=>{
       
    Usuario.findByPk(req.body.ID)
        .then(()=> { 
               console.log(cli.green(req.user.ID))
            if (req.isAuthenticated()) {
    
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
