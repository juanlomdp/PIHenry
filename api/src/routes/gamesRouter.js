const { Router } = require('express')
const gamesRouter = Router()

const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  // trabaja la carga de archivos
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + Date.now()+ext)
  },
 // preservePath: true // Habilita la opción preservePath
})

const upload = multer({ storage }) // Ruta donde se guardarán las imágenes subidas

const { getVideoGamesHandler, getVideoGamesbyIDHandler, getVideoGamesbyNameHandler, CreateVideoGameHander } = require('../handlers/videoGamesHandlers')

gamesRouter.get('/', getVideoGamesHandler)
gamesRouter.post('/', upload.single('image'), CreateVideoGameHander)// carga de imagen
gamesRouter.get('/name/', getVideoGamesbyNameHandler)
gamesRouter.get('/:idVideogame', getVideoGamesbyIDHandler)

module.exports = gamesRouter
