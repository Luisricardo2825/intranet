//Conexão com o banco de dados
//@$$$$$$$$$$$$$$$$$$$$$$$$$$$$

/*
                                       ,@.                                      
                                      /@@@,                                     
                                   / @@@@@@@ @                                  
                                   .@@@@@@@@@                                   
                                ( (@@@@@@@@@@@@ *                               
                                 @@@@@@@@@@@@@@@                                
                             , @@@@@@@@. *@@@@@@@@ .                            
                              @@@@@@@@     @@@@@@@@                             
                            @@@@@@@@*       (@@@@@@@@                           
                           @@@@@@@@           @@@@@@@@ ,                        
                         @@@@@@@@@   @@@@@@@   @@@@@@@@*                        
                      * @@@@@@@@     &@@@@@@     @@@@@@@@ (                     
                      *@@@@@@@@      &&@@@@@      @@@@@@@@.                     
                   @ @@@@@@@@        &&&&@@@        @@@@@@@@ (                  
                   .@@@@@@@@         @&&&&@*         @@@@@@@@                   
                / @@@@@@@@            &&&&&           .@@@@@@@@ .               
                 @@@@@@@@             @&&&&             @@@@@@@@                
               @@@@@@@@,              @@&&&              (@@@@@@@@              
              @@@@@@@@                @@@@@                @@@@@@@@ .           
            @@@@@@@@@                 ,@@@                  @@@@@@@@(           
         . @@@@@@@@                                           @@@@@@@@ *        
         (@@@@@@@@                    @@@@@                    @@@@@@@@,        
      @ @@@@@@@@                     @@@@@@@                     @@@@@@@@ @     
      .@@@@@@@@                      &@@@@@@                      @@@@@@@@      
   ( @@@@@@@@                                                      .@@@@@@@@ *  
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   
  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@(@@(@(@@@@@@@@@@@@@@ 
  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
     
        ################################################################
        #              CUIDADO AO EDITAR ESTE ARQUIVO                  #
        ################################################################

*/
/*
É necessário adicionar a este arquivo a senha e o usuário que utilizará no banco

Se necessário trocar o "dialect", é recomendado consultar a documentação do modulo sequelize(https://sequelize.org/master/manual/dialect-specific-things.html).

o host pode ser trocado para onde o banco se encontra, caso não seja na maquina local e,
se necessario, basta trocar o "host" para o IP da maquina que possui o servidor rodando.


"Com grandes poderes vem grandes responsábilidades"-Tio Ben
*/ 


const Sequelize = require("sequelize");
const cli = require("cli-color");
const SenCarmehil = "H1h2h3h4"
const SenRicardo = "ricardo"

const sequelize = new Sequelize("banco", "root", SenCarmehil, {  
  host: "localhost",
  dialect: "mariadb",
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
sequelize
  .authenticate()
  .then(function () {
    console.log(cli.green("Conectado com sucesso!"));
  })
  .catch(function (erro) {
    console.log(cli.red("Falha ao se conectar: ") + erro);
  });
