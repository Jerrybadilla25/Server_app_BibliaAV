const mongoose = require('mongoose');
const Shema = mongoose.Schema;




const newVersion = new Shema({
    versionBible: {type: String},
    descripcion: {type: String},
    copyright: {type: String},
    userCreator : {type: String},
    books: [{
        type: Shema.Types.ObjectId,
        ref: "book"
    }]
});


module.exports= mongoose.model('version', newVersion);