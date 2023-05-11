const axios = require('axios')

require('dotenv').config()
const {
  API_KEY
} = process.env

const { Genres } = require('../db')

const GetGenresApi = async () => {
  return await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)
}

const GetAllGenres = async () => {
  console.log('entre GetGenres')
  // consulto a la api y imprimo los resultados
  const PromApi = GetGenresApi()
  return PromApi.then((genre) => {
    return genre.data.results.map((genre) => {
      return ({
        id: genre.id,
        Nombre: genre.name
      })
    })
  })
}

const GetGenres = async () => {
  // la 1era carga lo hago desde el index
  const AllGender = await GetAllGenres()
  await Genres.bulkCreate(AllGender) // carga masiva
  return (AllGender)
}

const SearchGender = async (genre) => {
  return await Genres.findOne({ where: { Nombre: genre } })
}

const LoadGenres = async () => {
  // cargo los generos y solo muestro nombre
  const LoadGenresDb = await Genres.findAll({
    attributes: ['Nombre']
  })

  return LoadGenresDb
}

module.exports = {
  GetGenres,
  SearchGender,
  LoadGenres
}
