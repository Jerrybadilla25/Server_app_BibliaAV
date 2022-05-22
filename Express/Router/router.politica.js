const express = require("express");
const router = express.Router();
require('dotenv').config();

const Controller = require('../Controller/politica.controller');

//Rutas
router.get("/privacidad/bibliaav", Controller.getPolitica);

module.exports = router;