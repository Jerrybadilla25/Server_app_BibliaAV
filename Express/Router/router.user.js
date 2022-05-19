const express = require("express");
const router = express.Router();
require('dotenv').config();

const Controller = require('../Controller/User.controller');

//Rutas
router.post("/inicioAll", Controller.getUser);
router.post("/createJson", Controller.getCreate);

//router.post("/createUser", Controller.addUser);

module.exports = router;