const Usuarios = require("../model/model.user");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const Book = require("../model/model.book");
const Charter = require("../model/model.charter");
const Verse = require("../model/model.verse");
const Versiones = require("../model/model.version");
const VerseDia = require("../model/model.verseDia");
const { createInflate } = require("zlib");

exports.getUser = async function (req, res) {
  try {
    const { token } = req.body;
    if (token === process.env.TOKEN) {
      let verseDay = await VerseDia.find();
      return res.json(verseDay[0]);
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {}
};

exports.getCreate = async function (req, res) {
  console.log("nuevo inicio");
  const { token } = req.body;
  if (token === process.env.TOKEN) {
    creteFile();
    return res.json({ message: "creando archivo" });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const creteFile = async () => {
  console.log("creando archivos");

  //const version = "Biblia_del_oso_1569"
  const version = "Reina_Valera_1960";

  let versos = await Verse.find(
    { version: version },
    { originCharter: 1, versiculo: 1, numero: 1 }
  );
  let datos = JSON.stringify(versos);
  fs.writeFileSync("versosall.json", datos);

  //let data = await Versiones.find()
  //let datos = JSON.stringify(data)
  //fs.writeFileSync('versiones.json', datos)

  //let fullBooks = await Book.find({version: version},{book:1,nomenclatura:1, testament:1 }).sort({order:1})
  //let data =JSON.stringify(fullBooks)
  //fs.writeFileSync('booksReinaValera.json', data)

  //let charterCap = await Book.find({version: version}).populate('capitulos')
  //let data1 =JSON.stringify(charterCap)
  //fs.writeFileSync('charterReinaValera.json', data1)

  //let fullCharter = await Charter.find({version: version}).populate('verses')
  //let data2 =JSON.stringify(fullCharter)
  //fs.writeFileSync('fullLibroReinaValera.json', data2)

  //let searchCharter = await Charter.find({version: version}, {charter: 1})
  //let data3 =JSON.stringify(searchCharter)
  //fs.writeFileSync('buscarCapituloReinaValera.json', data3)

  //let data1 =JSON.stringify(verseDay)
  //fs.writeFileSync('verseDay.json', data1)
};
