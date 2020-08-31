const db = require("./DB"); //Importando a conexão com o banco

//Criando a estrutura da tabela
const Agenda = db.sequelize.define("agenda", {
  ID: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
      type: db.Sequelize.STRING,
      require:true
  },
  conteudo: {
      type: db.Sequelize.BLOB,
      require:true
  },

  usuario: {
      type: db.Sequelize.INTEGER,
      require:true
    },
  dataFin: {
        type: db.Sequelize.TEXT, 
        require: false
      }
});
Agenda.sync(); //Para que ele crie a tabela,caso não exista
module.exports = Agenda;
