const db = require("./DB"); //Importando a conexão com o banco

//Criando a estrutura da tabela
const Noticias = db.sequelize.define("noticias", {
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
    }
});
Noticias.sync(); //Para que ele crie a tabela,caso não exista
module.exports = Noticias;
