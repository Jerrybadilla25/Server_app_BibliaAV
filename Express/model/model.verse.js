const mongoose = require('mongoose');
const Shema = mongoose.Schema;




const newVerse = new Shema({
    title: { type: String},
    originCharter: { type: String},
    numero : {type: Number},
    versiculo: { type: String},
    version: { type: String},
    userCreator : {type: String},
    testament: { type: String},
    like: { type: Number, default: 0},
    view: { type: Number, default: 0},
});


module.exports= mongoose.model('verse', newVerse);