const axios = require('axios')
require('dotenv').config()
const {
  API_KEY
} = process.env

const { Videogame, Genres } = require('../db')
const { Op } = require('sequelize')

const { SearchGender } = require('./genresController')

const ObjGame = (id, nombre, description, plataformas, imagen, Fecha_lanzamiento, Rating, Genres) => {
  return ({
    id,
    Nombre: nombre,
    Descripción: description,
    Plataformas: plataformas,
    imagen,
    Fecha_lanzamiento,
    Rating,
    genres: Genres
  })
}

const GetGamesApi = async () => {
  // devuelvo array de objetos de games general getVideoGamesHandler
  console.log('entre todo')
  let i = 1
  const ArrPromis = []
  let ArrRes = []
  let ArrDatos = []
  while (i < 6) {
    const PromApi = await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
    ArrPromis.push(PromApi)
    i++
  }
  // results es un array  de objetos
  ArrRes = (await Promise.all(ArrPromis)).map((PromIndi) => {
    // (PromIndi.data.results);
    return PromIndi.data.results.map((dato) => {
      return ({
        id: dato.id,
        imagen: dato.background_image,
        Nombre: dato.name,
        genres: dato.genres
      })
    })
    // return (rta)
  })
  // ArrRes es un array con arrays de objetos
  ArrRes.map(dato => {
    ArrDatos = ArrDatos.concat(dato)
  })
  // recorro el array y le voy asignando un elemento a nuevo array asi me queda en uno
  return (ArrDatos)
}

const GetGamesDB = async () => {
  // devuelvo lo dato de la db general getVideoGamesHandler
  const GetGamesDb = await Videogame.findAll({

    include: {
      model: Genres,
      attributes: [['Nombre', 'name']], // cambio el nombre as
      through: { attributes: [] }
    },
    attributes: ['id', 'Nombre', ['Imagen', 'imagen']]

  })
  return GetGamesDb
}

const GetAllGames = (db, api) => {
  console.log('all games')
  // junto el resultado total de la api y de la db
  if (db.length > 0 && api.length > 0) {
    return ([...db, ...api])
  } else {
    if (db.length > 0) {
      return (db)
    }
    return (api)
  }
}

const GetGameByIdApi = async (id) => {
  return await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
}

const GetGameById = async (id, tipo) => {
  // getVideoGamesbyIDHandler
  // consulto por ID y chequeo si es de la api o de la Db
  if (tipo === 'api') {
    // console.log('api');
    const PromApi = GetGameByIdApi(id)
    return PromApi.then((game) => {
      return obj = ObjGame(game.data.id, game.data.name, game.data.description, game.data.platforms,
        game.data.background_image, game.data.released, game.data.ratings, game.data.genres)
    })
  } else {
    //  console.log('db');
    const DbVideo = await Videogame.findByPk(id, {
      include: {
        model: Genres,
        attributes: ['Nombre'],
        through: { attributes: [] }
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    if (!DbVideo) return ({ error: 'No se encontro resultado para: ' + id })
    // console.log(DbVideo.Nombre);
    // return (DbVideo)

    return ObjGame(DbVideo.id, DbVideo.Nombre, DbVideo.Descripcion, DbVideo.Plataformas,
      DbVideo.Imagen, DbVideo.Fecha_lanzamiento, DbVideo.Rating, DbVideo.genres)
  }
}

const GetGamebyNameDB = async (name) => {
  // getVideoGamesbyNameHandler
  // consulto nombre a la DB
  console.log('NAme DB ddd')
  const SearchDb = await Videogame.findAll({
    where: {
      Nombre: {
        [Op.iLike]: '%' + name + '%' // case-insensitive
      }
    },
    include: {
      model: Genres,
      attributes:  [['Nombre', 'name']], // cambio el nombre as
      through: { attributes: [] }
    },
    attributes: ['id', 'Nombre', 'Plataformas', ['Imagen', 'imagen'], 'Fecha_lanzamiento', 'Rating']
    // attributes: { exclude: ['createdAt','updatedAt'] }
  })
  if (SearchDb.length >= 16) {
    return (SearchDb.slice(0, 15))
  }
  if (SearchDb.length === 0) {
    return ({ error: 'No se encontro resultado para: ' + name })
  }

  return SearchDb
}

const GetGameByNameWeb = async (name) => {
  // getVideoGamesbyNameHandler
  // consulto nombre a la api
  console.log('name WEB')
  const PromApi = GetGameByNameApi(name)
  return PromApi.then((busqueda) => {
    if (busqueda.data.results.length >= 16) {
      return (busqueda.data.results.slice(0, 15))
    } else {
      if (busqueda.data.results.length === 0) {
        return ({ error: 'No se encontro resultado para: ' + name })
      }
      return (busqueda.data.results)
    }
  })
}
const GetGamebyNameAll = (api, db) => {
  // getVideoGamesbyNameHandler
  // obtengo resultado de la api y la db y los junto en uno
  if (db.length > 0 && api.length > 0) {
    const Standar = api.map((dato) => {
      return ObjGame(dato.id, dato.name, '', dato.platforms, dato.background_image,
        dato.released, dato.rating, dato.genres)
    })

    const total = [...db, ...Standar]
    if (total.length >= 16) {
      return (total.slice(0, 15))
    }
    return (total)
  } else {
    if (db.length > 0) {
      return (db)
    } else {
      if (api.error){
        return (api)
      } 
      return api.map((dato) => {
        return ObjGame(dato.id, dato.name, '', dato.platforms, dato.background_image,
          dato.released, dato.rating, dato.genres)
      })
    }
  }
}

const GetGameByNameApi = async (name) => {
  console.log('entre NAME')
  return await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
}

const CreateVideoGameDB = async (Nombre, Descripcion, Plataformas, Imagen, Fecha_lanzamiento, Rating, SearchGenre) => {
  // guarda los datos del formulario
  // const CreateVideo= await Videogame.create({Nombre,Descripcion,Plataformas,Imagen,Fecha_lanzamiento,Rating})
  const [video, created] = await Videogame.findOrCreate({
    where: { Nombre },
    defaults: {
      Nombre, Descripcion, Plataformas, Imagen, Fecha_lanzamiento, Rating
    }
  })
  if (!created) return ({ error: 'No se puede crear, dado que ya existe el nombre: ' + Nombre })
  let i = 0
  // obtengo el array con los generos y creo las relaciones
  while (SearchGenre.length > i) {
    const Genre = await SearchGender(SearchGenre[i])
    await Genre.addVideogame(video) // creo la relacion por cada genero
    i++
  }
  return ({ ok: 'Se creo correctamente' })
}

module.exports = {
  GetGamesApi,
  GetGamesDB,
  GetAllGames,
  GetGameById,
  GetGameByNameWeb,
  GetGamebyNameDB,
  GetGamebyNameAll,
  CreateVideoGameDB
}
