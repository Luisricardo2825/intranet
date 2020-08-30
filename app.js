//Carregando módulos
const express = require("express")
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser")
const app = express();
const admin = require("./Routes/admin")
const usr = require("./Routes/usuario")
const public = require("./Routes/public")
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash");
const passport = require("passport");
const Usuario = require("./models/Usuarios");
require("./Config/auth")(passport)

// Configurações
 // Session
    app.use(session({
        secret: "session",
        resave: true,
        saveUninitialized:true}))
    app.use(flash())
    
    app.use(passport.initialize())
    app.use(passport.session())
    
 // Middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg")    
        res.locals.error_msg = req.flash("error_msg")
        res.locals.error = req.flash("error")
        res.locals.user = req.user || null;
        next()
    })


 // Body parser 
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
 // Handlebars
    app.engine("handlebars", handlebars({ defaultLayout: "main" }), handlebars());
app.set("view engine", "handlebars");

    

 // Public
app.use(express.static(path.join(__dirname, "Public")))
app.use(express.static('views/images')); 
 // Rotas
app.get('/', (req, res) => { res.render("Public/Home") })
app.get("/logout", (req, res) => {
    req.logout()
    req.flash("success_msg", "Deslogado com sucesso")
    res.redirect("/")
})

    app.use('/',public)
    app.use('/admin',admin)    
    app.use('/Usuario',usr)    
// Outros
    const PORT = 8081
    app.listen(PORT, function () {
        console.log("Servidor iniciado na URL: http://localhost:8081");
    });
