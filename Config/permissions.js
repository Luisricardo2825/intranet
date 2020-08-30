const Usuario = require("../models/Usuarios");

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
            if (req.isAuthenticated()) {
    
                return next();
            }
            else {
                req.flash("error_msg", "É necessario estar logado para acessar esta página")
                res.redirect("/")
            }
    }
}
