const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newVerseDia = new Schema({
    descripcion: { type: String},
    originCharter: { type: String},
    numero : {type: Number},
    versiculo: { type: String},
    version: { type: String},
    userCreator : {type: String},
    testament: { type: String},
    like: { type: Number},
    view: { type: Number},
});

module.exports= mongoose.model('verseDia', newVerseDia);
