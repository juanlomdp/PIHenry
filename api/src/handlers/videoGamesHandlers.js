const { GetGamesApi, GetGamesDB, GetAllGames, GetGameById, GetGameByNameWeb, CreateVideoGameDB, GetGamebyNameDB, GetGamebyNameAll } = require('../controller/videoGamesController')
require('dotenv').config()
const cloudinary = require('cloudinary').v2;

const {
  CLOUD_NAME, CLOUD_API, CLOUD_SECRET
} = process.env

// para que me suba algo si estoy en locahost
//let UrlImagen="https://pihenry-production.up.railway.app/image-1683566764092.jpg"
const URL='https://pihenry-production.up.railway.app/'

// Configuration 
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API,
  api_secret: CLOUD_SECRET
});

const getVideoGamesHandler = async (req, res) => {
  try {
    // obtengo un array de objetos de games
    const api = await GetGamesApi()
    const db = await GetGamesDB()
    const response = GetAllGames(db, api)
    res.status(200).json(response)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const getVideoGamesbyIDHandler = async (req, res) => {
  const { idVideogame } = req.params
  // si no hay id se ejecuta getVideoGamesHandler
  try {
    const tipo = isNaN(idVideogame) ? 'db' : 'api'
    const response = await GetGameById(idVideogame, tipo)
    res.status(200).json(response)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const getVideoGamesbyNameHandler = async (req, res) => {
// consulta por nombre
  const { name } = req.query
  try {
    console.log('entre NAME');
    if (!name) res.status(201).send('No puede estar vacio name')
    const api = await GetGameByNameWeb(name)
    const db = await GetGamebyNameDB(name)
    const response = GetGamebyNameAll(api, db)
    if (response.error) {
      res.status(201).send(response.error)
    } else {
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const CreateVideoGameHander = async (req, res) => {
  // creo un video juego
  try {
    const { Nombre, Descripcion, Plataformas, Fecha_lanzamiento, Rating, SearchGenre } = req.body
    //
    const ArrSearch = SearchGenre.split(',') // viene como un string por lo del archivo

     UrlImagen=URL+req.file.filename;
     console.log(UrlImagen);
     console.log('----------------');
      let NameSinextencion=req.file.filename.slice(0,req.file.filename.length - 4)
     // console.log(req.file);
      const resup = await cloudinary.uploader.upload(UrlImagen, {public_id: NameSinextencion})
      const { secure_url } = resup;
      console.log(secure_url);

    const response = await CreateVideoGameDB(Nombre, Descripcion, Plataformas, secure_url, Fecha_lanzamiento, Rating, ArrSearch)
    res.status(200).json(response)
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      // para filtar el error de validacion
      const ArrError = []
      error.errors.forEach(element => {
        const Obj = {
          [element.path]: element.message
        }
        ArrError.push(Obj)
      })
      res.status(200).json(ArrError)
    } else {
      console.log(error)
      res.status(400).send(error.message)
    }
  }
}

module.exports = {
  getVideoGamesHandler,
  getVideoGamesbyIDHandler,
  getVideoGamesbyNameHandler,
  CreateVideoGameHander
}
