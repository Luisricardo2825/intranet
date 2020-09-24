const Agenda = require("../models/Agenda");
var Data = require("../Config/Date");

exports.Create = (req, res) => {
    var dateFin;

    if (!req.body.dataFin || typeof req.body.dataFin == undefined || req.body.dataFin == null) {
        dateFin = "Indeterminado";
    } else {
        dateFin = req.body.dataFin;
    }
    Agenda.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        usuario: req.user.ID,
        dataFin: dateFin,
        dataCriacao: Data,
        dataAtualizacao: Data,
    })
        .then(() => {
            req.flash("success_msg", "Anotação adicionada com sucesso!");
            return res.redirect("/Usuario/Home");
        })
        .catch((erro) => {
            req.flash("error_msg", "Erro ao adicionar a Anotação: " + erro);
            return res.redirect("/Usuario/Home");
        });
};

exports.DestroyOne = (req, res) => {
    Agenda.destroy({ where: { id: req.params.id } })
        .then(() => {
            req.flash("success_msg", "Anotaçao deletada com sucesso!");
            return res.redirect("/Usuario/Home");
        })
        .catch((erro) => {
            req.flash("error_msg", "Erro ao deletar anotação: " + erro);
            return res.redirect("/Usuario/Home");
        });
};
exports.DestroyAllFromUser = (req, res) => {
    Agenda.destroy({ where: { usuario: req.params.id } })
        .then(() => {
            return res.redirect("/");
        })
        .catch((erro) => {
            req.flash("error_msg", "Erro ao deletar anotação: " + erro);
            return res.redirect("/");
        });
};

exports.FindOne = (req, res) => {
    const id = req.params.id;

    Agenda.findByPk(id)
        .then((data) => {
            res.render("usuario/editar_anotacao", { data: data });
        })
        .catch((err) => {
            req.flash("error_msg", "Este usuário não existe " + err);
            res.status(500).redirect("admin/usuarios");
        });
};

exports.Update = (req, res) => {
    const id = req.params.id;
    var dateFin;

    if (!req.body.dataFin || typeof req.body.dataFin == undefined || req.body.dataFin == null) {
        dateFin = "Indeterminado";
    } else {
        dateFin = req.body.dataFin;
    }

    Agenda.update(
        {
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            dataFin: dateFin,
            dataAtualizacao: Data,
        },
        {
            where: { id: id },
        }
    )
        .then((num) => {
            if (num == 1) {
                req.flash("success_msg", "Anotacão editada com sucesso!");
                return res.redirect("/Usuario/home");
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
