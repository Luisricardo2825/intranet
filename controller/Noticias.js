const Noticias = require("../models/Noticias");

exports.Create = (req, res) => {
    Noticias.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        Destaque: req.body.Destaque,
        usuario: req.user.ID     
    })
        .then(() => {
            req.flash("success_msg", "Noticia adicionada com sucesso!")
            return res.redirect("/Usuario/Home")
        })
        .catch((erro) => {
            req.flash("error_msg", "Erro ao adicionar a noticia: " + erro)
            return res.redirect("/Usuario/Home")
        });
}

exports.DestroyOne = (req, res) => {
    Noticias.destroy({ where: { id: req.params.id } })
        .then(() => {
            req.flash("success_msg", "Anotaçao deletada com sucesso!")
            return res.redirect("/Usuario/Home")
        })
        .catch((erro) => {
            req.flash("error_msg", "Erro ao deletar noticia: " + erro)
            return res.redirect("/Usuario/Home")
        });
};
exports.DestroyAllFromUser = (req, res) => {
    Noticias.destroy({ where: { usuario: req.params.id } })
        .then(() => {
            return res.redirect("/")
        })
        .catch((erro) => {
            req.flash("error_msg", "Erro ao deletar noticia: " + erro)
            return res.redirect("/")
        });
};

exports.FindOne = (req, res) => {
    const id = req.params.id;
  
    Noticias.findByPk(id)
      .then(data => {
       // res.render("usuario/editar_anotacao",{data:data})  
      }).catch(err => {
            req.flash("error_msg", "Este usuário não existe "+err)
             res.status(500).redirect("admin/usuarios");
      });
};

exports.Update = (req,res) => {
    const id = req.params.id;

    Noticias.update({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        Destaque: req.body.Dest.Noticia,
    }
        , {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                req.flash("success_msg", "Noticia editada com sucesso!")
                return res.redirect("/Usuario/home")
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
                message: "Error ao alterar. id=" + id + err
            });
        });
}
