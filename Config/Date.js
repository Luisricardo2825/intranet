
var dateFormat = require('dateformat');
var now = new Date();
dateFormat.i18n = {
    dayNames: [
         'Domingo','Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado',
         'Domingo','Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'
    ],
    monthNames: [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    timeNames: [
        ''
    ]
    };
    var Data = dateFormat(now,"yyyy-mm-dd").toString();
    console.log(Data)


module.exports = Data

