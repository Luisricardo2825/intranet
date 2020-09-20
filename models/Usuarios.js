const db = require("./DB");
const bcrypt = require("bcryptjs")

//Criando a estrutura da tabela
const Usuario = db.sequelize.define("usuarios", {
  ID: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
      type: db.Sequelize.STRING,
      require:true
  },
  email: {
      type: db.Sequelize.STRING,
      require:true
  },
  usuario: {
      type: db.Sequelize.STRING,
      require:true
    },
  senha: {
        type: db.Sequelize.STRING,
        require:true
      },
  admin: {
        type: db.Sequelize.INTEGER,
        default:0
    },
  marketing: {
        type: db.Sequelize.INTEGER,
        default:0
    },
    img: {
      type:db.Sequelize.BLOB
    },
    dataCriacao: {
        type: db.Sequelize.TEXT, 
        require: false
    },
    dataAtualizacao: {
        type: db.Sequelize.TEXT, 
        require: false
  }
},{timestamps: false,});
Usuario.sync(); //Para que ele crie a tabela,caso não exista, basta descomentar esta linha
module.exports = Usuario;


