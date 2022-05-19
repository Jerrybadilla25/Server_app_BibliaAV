const mongoose = require('mongoose');
const Shema = mongoose.Schema;




const newCharte = new Shema({
    idBook: {type: String},
    charter : {type: String},
    order : {type: Number},
    version: { type: String},
    userCreator : {type: String},
    testament: { type: String},
    like: { type: Number, default: 0},
    view: { type: Number, default: 0},
    verses: [{
        type: Shema.Types.ObjectId,
        ref: "verse"
    }]
});


module.exports= mongoose.model('charte', newCharte);

