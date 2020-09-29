const path = require("path");
const handlebars = require("express-handlebars");
const Helper = require("./Helpers");

const hbs = handlebars.create({
    defaultLayout: "main",
    layoutsDir: path.join("views/layouts"),
    partialsDir: path.join("views/partials"),
    helpers: {
        is1: Helper.is1,
        is2: Helper.is2,
        is3: Helper.is3,
        TakeHalf: Helper.TakeHalf,
        TakePara: Helper.TakePara,
    },
});

module.exports = hbs;
