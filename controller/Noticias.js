const Noticias = require("../models/Noticias");
var Data = require("../Config/Date");

exports.Create = (req, res) => {
    Noticias.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        Destaque: req.body.Destaque,
        usuario: req.user.ID,
        dataCriacao: Data,
        dataAtualizacao: Data,
    })
        .then(() => {
            req.flash("success_msg", "Notícia adicionada com sucesso!");
            return res.redirect("/Usuario/Marketing");
        })
        .catch((erro) => {
            req.flash("error_msg", "Erro ao adicionar a notícia: " + erro);
            return res.redirect("/Usuario/Marketing");
        });
};

exports.DestroyOne = (req, res) => {
    Noticias.destroy({ where: { ID: req.params.id, usuario: req.user.ID } })
        .then(() => {
            req.flash("success_msg", "Notícia deletada com sucesso!");
            return res.redirect("/Usuario/Marketing");
        })
        .catch((erro) => {
            req.flash("error_msg", "Erro ao deletar notícia: " + req.user.ID + "______" + erro);
            return res.redirect("/Usuario/Marketing");
        });
};
exports.DestroyAllFromUser = (req, res) => {
    Noticias.destroy({ where: { usuario: req.params.id } })
        .then(() => {
            return res.redirect("/");
        })
        .catch((erro) => {
            req.flash("error_msg", "Erro ao deletar notícia: " + erro);
            return res.redirect("/");
        });
};

exports.FindOne = (req, res, edit) => {
    var type;

    if (edit == true) {
        type = { where: { usuario: req.user.ID } };
    } else {
        type;
    }
    const data = Noticias.findByPk(req.params.id, type)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            req.flash("error_msg", "Esta pagina não existe");
            res.status(500).redirect("Marketing/home");
        });
    return data;
};

exports.Update = (req, res) => {
    const id = req.params.id;

    Noticias.update(
        {
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            Destaque: req.body.Destaque,
            dataAtualizacao: Data,
        },
        {
            where: { id: id },
            usuario: req.user.ID,
        }
    )
        .then((num) => {
            if (num == 1) {
                req.flash("success_msg", "Notícia editada com sucesso!");
                return res.redirect("/Usuario/Marketing");
            } else {
                if (!id || typeof id == undefined || id == null || id == "") {
                    id = null;
                    res.send({
                        message: `Não foi possivel realizar a alteração id=${id}.`,
                    });
                }
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error ao alterar. id=" + id + err,
            });
        });
};
