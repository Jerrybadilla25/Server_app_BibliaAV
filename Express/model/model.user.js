const mongoose = require('mongoose');
const Shema = mongoose.Schema;
const bcrypt = require('bcrypt');


const newUser = new Shema({
    user : {type: String},
    email: {type: String, unique: true},
    password: {type: String},
    fecha: { type: Date, default: Date.now},
    roles: [{
        type: Shema.Types.ObjectId,
        ref: "rol"
    }]
});


//esto lo usamos para cifrar la contraseña
newUser.methods.encryptPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
 };
 
 //este metodo compara la contraseña del usuario 
 
 newUser.methods.matchPassword = async function(password){
     return await bcrypt.compare(password, this.password);
 };

module.exports= mongoose.model('usuario', newUser);