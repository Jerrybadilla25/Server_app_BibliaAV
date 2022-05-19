const jwt = require('jsonwebtoken');
require('dotenv').config();

//imporr model
const User = require('../model/model.user');

module.exports = async function veryFyToken (req, res, next){
    var token = req.headers['x-access-token'];
    if(!token){
        return res.status(403).json({message: "no token provider"});
    }
    const decoder = jwt.verify(token, process.env.SECRET);
    const userID = await User.findById(decoder.id, {password: 0});
    if(!userID){
        return res.status(400).json({message: "usuario no encontrado"});
    }
    next();
}