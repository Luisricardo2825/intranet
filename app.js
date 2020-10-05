//Este arquivo é onde começa toda a operação da API(requisições de Rotas,validações,operações e tratamentos)

//Carregando módulos
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const server = require("http").createServer();
const io = require("socket.io")(server);
const admin = require("./Routes/admin");
const usr = require("./Routes/usuario");
const public = require("./Routes/public");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const Agenda = require("./models/Agenda");
const controlerAge = require("./controller/Agenda");
const db = require("./models/db");
const Noticias = require("./models/Noticias");
const Data = require("./Config/Date");
const hbs = require("./Config/Handlebars");
const Op = db.Sequelize.Op;

require("./Config/auth")(passport);

// Configurações
// Session, são as sessoes de usuários abertas no servidor
app.use(
    session({
        secret: "session",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Middlewares(Acontecem entre o usuario e o servidor antes da requisição ou resposta ser efetuada)
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    //Verifica se tem usuário logado
    if (req.user != null) {
        const ID = req.user.ID
        let total = controlerAge.FindAndCountAll(ID).then((result) => {
            res.locals.notificacoes = (result.count)
        })


        controlerAge.AutoUpdate(req,res)
    }
    next();
});

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
//Helper's Handlebars

// Public e static files
app.use(express.static(path.join(__dirname, "Public")));
app.use(express.static("views/images"));

// Rotas
app.get("/", (req, res) => {
    Noticias.findAll().then(function (noticias) {
        res.render("Public/Home", { noticias: noticias });
    });
});
app.get("/logout", (req, res) => {
    req.logout();
    req.flash("success_msg", "Deslogado com sucesso");
    res.redirect("/");
});

app.use("/", public); //Rota pública
app.use("/admin", admin); //Rota de admins
app.use("/Usuario", usr); //Rota dos usuários
//Configuração do Socket.IO(Chat)

io.on("connection", (client) => {
    client.on("event", (data) => {
        console.log("Connectado");
    });
    client.on("disconnect", () => {
        console.log("desconectado");
    });
});

// Outros
const PORT = 8081;
app.listen(PORT, function () {
    console.log("Servidor iniciado na URL: http://localhost:8081");
});
