const Book = require('../model/model.book');
const Charter = require('../model/model.charter');
const Verse = require('../model/model.verse');
const Versiones = require('../model/model.version');
const VerseDia = require('../model/model.verseDia');


exports.getBook = async (req, res) => {
  const user = req.params.userName;
  const data1 = await Book.find({ userCreator: user });
  res.json(data1);
};


exports.addBook = async (req, res)=>{
  const books = await Book.find({version: req.body.version});
  const filterArray = books.filter(x => x.book === req.body.book);
  if(filterArray.length>=1){
    res.json({mesage: `El libro de ${req.body.book} ya esta registrado`});
  }else{
    let versions = await Versiones.findById(req.body.idBook);
    const {book, order, version, testament, nomenclatura, userCreator} = req.body;
    const data = new Book({book, order, version, testament, nomenclatura, userCreator});
    versions.books.push(data._id);
    await data.save();
    await versions.save();
    res.status(200).json({mesage: "Libro agregado correctamente"});
  }
  
}

exports.addCharter = async (req, res) => {
  const {
    version,
    idbook,
    testament,
    versiculos,
    numberVerses,
    order,
    libro,
    userCreator,
  } = req.body;
  
  const charter = libro + " " + order;
  const validate = await Charter.find({ charter: charter });
  if (validate !== null) {
    if (validate.version === version) {
      res.json({ mesage: `El capitulo ${validate.charter} ya existe` });
    } else {
      //ver funciones callback mas abajo
      const replaceVerseMas = replaceVerse(versiculos, numberVerses);
      const arrayVerses = divideVerse(replaceVerseMas);
      const BooksData = await Book.findById(idbook);
      const newCharter = await Charter({
        charter:charter,
        version:version,
        testament:testament,
        order:order,
        userCreator:userCreator,
        idBook:idbook,
      });
      BooksData.capitulos.push(newCharter._id);
      await BooksData.save();
      for (let n = 0; n < arrayVerses.length; n++) {
        const newVerse = await Verse({
          version: version,
          testament: testament,
          userCreator: userCreator,
          numero: n + 1,
          originCharter: charter,
          versiculo: arrayVerses[n],
        });
        newCharter.verses.push(newVerse._id);
        await newVerse.save();
      }
      await newCharter.save();
      res.json({ mesage: "Datos guardados correctamente" });
    }
  } else {
    //ver funciones callback mas abajo
    const replaceVerseMas = replaceVerse(versiculos, numberVerses);
    const arrayVerses = divideVerse(replaceVerseMas);
    const BooksData = await Book.findById(idbook);
    const newCharter = await Charter({
      charter:charter,
      version:version,
      testament:testament,
      order:order,
      userCreator:userCreator,
      idBook:idbook,
    });
    BooksData.capitulos.push(newCharter._id);
    await BooksData.save();
    for (let n = 0; n < arrayVerses.length; n++) {
      const newVerse = await Verse({
        version: version,
        testament: testament,
        userCreator: userCreator,
        numero: n + 1,
        originCharter: charter,
        versiculo: arrayVerses[n],
      });
      newCharter.verses.push(newVerse._id);
      await newVerse.save();
    }
    await newCharter.save();
    res.json({ mesage: "Datos guardados correctamente" });
  }
};

exports.getCharter = async(req, res)=>{
    const userName = req.params.userName;
    const userVersion = req.params.version;
    const data = await Charter.find({userCreator: userName});
    const data2 = data.filter(x => x.version === userVersion);
    res.json(data2);
}



exports.getBookPopulate = async(req, res)=>{
  const data = await Book.find().populate('capitulos');
  res.json(data);
}

exports.getCharterEdit = async (req, res)=>{
  const datos = await Book.findById(req.params.id).populate("capitulos");
  res.json(datos);
}

exports.editCharter = async (req, res)=>{
  const data = await Charter.findById(req.params.id).populate('verses');
  res.json(data);
}

exports.deleteCharter = async (req, res)=>{
    const idBooks = req.params.idBook;
    //console.log(`idbook ${idBooks}`);
    const idCharter = req.params.id;
    //console.log(`idCharter ${idCharter}`);
    const data = await Charter.findById(idCharter);
    for(let n=0; n<data.verses.length; n ++){
      await Verse.findByIdAndDelete(data.verses[n]);
    }
    await Charter.findByIdAndDelete(data._id);
    //borarr id capitulo del book.capitulos
    const books = await Book.findById(idBooks);
    const index = books.capitulos.indexOf(idCharter);
    //console.log(index);
    books.capitulos.splice(index, 1);
    //console.log(books);
    res.json({mesage: `${data.charter} ha sido borrado`});
}

exports.editVerse = async (req, res)=>{
  //console.log(req.body)
   await Verse.findByIdAndUpdate(req.body._id, req.body);
   res.json({mesage: "Cambios realizados"});
}

exports.addVersiones = async (req, res)=>{
  const {versionBible, descripcion, copyright, userCreator}= req.body;
  const newVersion = await Versiones({versionBible, descripcion, copyright, userCreator});
  await newVersion.save();
  res.json({mesage: "Nueva version agregada"});
}

exports.getVersiones = async (req, res)=>{
  const versions = await Versiones.find();
  res.json(versions);
}

exports.getVerseDia = async(req, res)=>{
  try {
  let versiculoDia = await Verse.find({version: "Biblia_del_oso_1569"}, {_id: 1})
  let min = 0
  let max = versiculoDia.length
  let idx = random(min, max)
  let versi = await Verse.findById({_id: versiculoDia[idx]._id})
  let {originCharter, numero, versiculo, version, userCreator, testament, like, view} = versi
  let data = new VerseDia({originCharter, numero, versiculo, version, userCreator, testament, like, view})
  let idVerse = await VerseDia.findOne()
  if(idVerse){
    await VerseDia.findByIdAndUpdate({_id: idVerse._id},{ $set:{originCharter, numero, versiculo, version, userCreator, testament, like, view}})
    res.json(data)
  }else{
    await data.save()
    res.json(data)
  }
  } catch (error) {
    console.log(error)
    res.json({message: "error"})
  }
}

//funcion randon
function random(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}



//funciones callback
const replaceVerse = (versiculos, numberVerses)=>{
  const y = parseInt(numberVerses);
  let verseCombertido= versiculos;
  for(let i=1; i<y+2; i++){
    let num = i;
    let text = num.toString();
    let ver = verseCombertido.replace(text, "+");
    verseCombertido= ver;
  }
  return verseCombertido;
}


const divideVerse = (replaceVerseMas)=>{
  let verses = replaceVerseMas;
  let cadena= verses.split("+");
  cadena.shift();
  return cadena;
}

//fin de funciones callback

  