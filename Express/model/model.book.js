const mongoose = require('mongoose');
const Shema = mongoose.Schema;




const newBook = new Shema({
    nomenclatura: {type: String},
    book : {type: String},
    userCreator : {type: String},
    version: { type: String},
    testament: { type: String},
    order: { type: Number},
    like: { type: Number, default: 0},
    view: { type: Number, default: 0},
    capitulos: [{
        type: Shema.Types.ObjectId,
        ref: "charte"
    }]
});


module.exports= mongoose.model('book', newBook);