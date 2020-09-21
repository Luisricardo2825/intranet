//Este arquivo é onde começa toda a operação da API(requisições de Rotas,validações,operações e tratamentos)
 

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
const cli = require("cli-color");
const Agenda = require("./models/Agenda")
const db = require("./models/db");
const Data = require("./Config/Date")
const Op = db.Sequelize.Op
require("./Config/auth")(passport)

// Configurações
 // Session, são as sessoes de usuários abertas no servidor
    app.use(session({
        secret: "session",
        resave: true,
        saveUninitialized:true}))
    app.use(flash())
    
    app.use(passport.initialize())
    app.use(passport.session())
    
 // Middlewares(Acontecem entre o usuario e o servidor antes da requisição ou resposta ser efetuada)
app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg")    
        res.locals.error_msg = req.flash("error_msg")
        res.locals.error = req.flash("error")
        res.locals.user = req.user || null;
    //Verifica se tem usuário logado
    if (req.user != null) {
        var text = Agenda.findAndCountAll({
            where: {
                usuario: req.user.ID,
                dataFin: {
                    [Op.lte]: Data
                },
                FinalizadoPor:null
            }
        }).then((count) => {
            // Cria o middleware "notificações" logo após o findAndCountAll
            if (count.count == "0" || count.count ==null) {
            
            }
            else {
                res.locals.notificacoes = count.count 
            }
            
        })
    
        Agenda.findAll({
            where: {
                usuario: req.user.ID,
            },raw:true
        }).then((dados) => {
            // Cria o middleware "notificações" logo após o findAndCountAll
            if (dados == "0" || dados ==null) {
                for (let index = 0; index < dados.length; index++) {
                    const element = dados[index];
                    console.log(element.ID)
                    Agenda.update({
                        FinalizadoPor:"Fim de prazo"
                    }, { where: { ID: element.ID, dataFin: Data } })
                    
                    Agenda.update({
                        FinalizadoPor:null
                       }, {where: { ID: element.ID,dataFin:{[Op.ne]:Data} }})
                }
                
            }
            else {
                for (let index = 0; index < dados.length; index++) {
                    const element = dados[index];               
                    Agenda.update({
                     FinalizadoPor:"Fim de prazo"
                    }, { where: { ID: element.ID, dataFin: { [Op.lte]: Data }}})
                    
                    Agenda.update({
                        FinalizadoPor:null
                       }, {where: { ID: element.ID,dataFin:{[Op.gte]:Data} }})
                }
                
            }
            
        })   
}
next()
            
    })


 // Body parser 
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
 // Handlebars
    app.engine("handlebars", handlebars({ defaultLayout: "main" }), handlebars());
    app.set("view engine", "handlebars");

    

 // Public e static files
    app.use(express.static(path.join(__dirname, "Public")))
    app.use(express.static('views/images')); 
 // Rotas
app.get('/', (req, res) => {
    res.render("Public/Home")
})
    app.get("/logout", (req, res) => {
    req.logout()
    req.flash("success_msg", "Deslogado com sucesso")
    res.redirect("/")
})

    app.use('/',public)          //Rota pública
    app.use('/admin',admin)     //Rota de admins
    app.use('/Usuario',usr)    //Rota dos usuários
// Outros
    const PORT = 8081
    app.listen(PORT, function () {
        console.log("Servidor iniciado na URL: http://localhost:8081");
    });
