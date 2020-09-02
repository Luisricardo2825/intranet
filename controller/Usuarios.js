const Usuario = require("../models/Usuarios");
const Agenda = require("../models/Agenda");
const bcrypt = require("bcryptjs")

exports.Create = (req, res) => {
    
    var erros = []
    var memory = []
    const senha = req.body.senha
    const usuario = req.body.usuario
    const email = req.body.email
    const idade = req.body.idade
    const nome = req.body.nome
    /*nome: nome,
    idade: idade,
    email: email,
    senha: senha,
    usuario:usuario*/

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "Nome inválido" })
    }
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({ texto: "Email inválido" })
    }
    
    if (!req.body.idade || typeof req.body.idade == undefined || req.body.idade == null) {
        erros.push({ texto: "Idade inválido" })
    }
    
    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({ texto: "Senha inválida"})
    }
    if (req.body.senha.length<3) {
        erros.push({ texto: "Senha muito curta"})
    }
    if (req.body.senha2 != req.body.senha) {
        erros.push({ texto: "Senhas são diferentes"})
    }
    
    if (!req.body.usuario || typeof req.body.usuario == undefined || req.body.usuario == null) {
        erros.push({ texto: "Usuário inválido" })
    }
    if (erros.length > 0) {
        res.render("Public/registro", {
            erros: erros, memory: {
                nome:nome,
                senha:senha,
                email:email,
                idade:idade,
                usuario:usuario
            }})
        
    }
    else {
        Usuario.findOne({ where: { usuario: req.body.usuario } }).then((usuario) => {
            if (usuario) {
                req.flash("error_msg", "Já existe uma conta associada a este usuario")
                return res.redirect("/registrar")
            }
            else {
                var Senha
                bcrypt.genSalt(10, (erro, salt) => {
                    //Encripta a senha(constant) em um hash
                    bcrypt.hash(senha, salt, (erro, hash) => {
                        //verifica se ocorreu algum erro durante o encrypt
                        if (erro) {
                            req.flash("error_msg", "Houve um erro ao salvar")
                            res.redirect("/Usuario")
                        }
                        //Dando o valor da senha(var) já encriptado
                        Senha = hash
                        console.log(Senha)
                        Usuario.create({
                            nome: req.body.nome,
                            email: req.body.email,
                            idade: req.body.idade,
                            senha: Senha,
                            usuario: req.body.usuario
                        })
                            .then(() => {
                                req.flash("success_msg", "Usuario cadastrado com sucesso!")
                                return res.redirect("/")
                            })
                            .catch((erro) => {
                                req.flash("error_msg", "Erro a cadastrar usuario: " + erro)
                                return res.redirect("/")
                            });
                    })
                })

            }
        })      
    }
};

exports.Update = (req, res) => {
    const id = req.params.id;
    var erros = []
    const senha = req.body.senha

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "Nome inválido" })
    }
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({ texto: "Email inválido" })
    }
    
    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({ texto: "Senha inválida" })
    }
    
    if (!req.body.usuario || typeof req.body.usuario == undefined || req.body.usuario == null) {
        erros.push({ texto: "Senha inválida" })
    }
    if (erros.length > 0) { 
        Usuario.findByPk(id)
          .then(data => {
            res.render("admin/editar",{data:data, erros: erros})  
          }).catch(err => {
                req.flash("error_msg", "Este usuário não existe "+err)
                 res.status(500).redirect("admin/usuarios");
          });
    } else {
            var Senha
            bcrypt.genSalt(10, (erro, salt) => {
                //Encripta a senha(constant) em um hash
                bcrypt.hash(senha, salt, (erro, hash) => {
                    //verifica se ocorreu algum erro durante o encrypt
                    if (erro) {
                        req.flash("error_msg", "Houve um erro ao salvar")
                        res.redirect("/Usuario")
                    }
                    //Dando o valor da senha(var) já encriptado
                    Senha = hash
                    console.log(Senha)
            
                    Usuario.update({
                        nome: req.body.nome,
                        email: req.body.email,
                        senha: Senha,
                        usuario: req.body.usuario
                    }
                        , {
                            where: { id: id }
                        })
                        .then(num => {
                            if (num == 1) {
                                req.flash("success_msg", "Usuário editado com sucesso!")
                                return res.redirect("/admin/Usuarios")
                            } else {
                                if (!id || typeof id == undefined || id == null || id == "") {
                                    id = null
                                    res.send({
                                        message: `Não foi possivel realizar a alteração id=${id}.`
                                    });
                                }
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Error ao alterar. id=" + id
                            });
                        });
                })
            })
        }
};
  
exports.FindOne = (req, res) => {
    const id = req.params.id;
  
    Usuario.findByPk(id)
      .then(data => {
        res.render("admin/editar",{data:data})  
      }).catch(err => {
            req.flash("error_msg", "Este usuário não existe "+err)
             res.status(500).redirect("admin/usuarios");
      });
};
  
exports.DestroyOne = (req, res) => {
    Usuario.destroy({ where: { id: req.params.id } })
        .then(() => {
            Agenda.destroy({ where: { usuario: req.params.id } })
        .then(() => {
            req.flash("success_msg", "Usuario deletado com sucesso!")
            return res.redirect("/admin/Usuarios")
        })
        .catch((erro) => {
            req.flash("error_msg", "Erro ao deletar anotações: " + erro)
            return res.redirect("/admin/Usuarios")
        });
            
        })
        .catch((erro) => {
            req.flash("error_msg", "Erro ao deletar usuario: !" + erro)
            return res.redirect("/admin/Usuarios")
        });
};
