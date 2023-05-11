import {
  GETALLGAMES, SHOWLOADING, GETALLGAMES_NAME, CLEANFILTER_GAMES,
  CLEAN_RTA, LOAD_GENRES, FILTER_TIPO, FILTER_GENRES, RESET_FILTER, ORDER_GAMES
  , GET_DETAIL_GAMES, CLEAN_DETAIL,CURRENTPAGE
} from './actions'

// http://localhost:3001/
// https://pihenry-production.up.railway.app/
const initialState = {
  allGames: [], // todos
  rta: [], // renderizo
  PorRequest:[], // por si crea request
  detail: {},
  filtro_tipo: '',
  filtro_genre: '',
  filtro_consulta:false,
  genres: [],
  loading: false,
  CurrentPage:1
}

const filtroGenero = (array, action) => {
  const busqueda = array.map(datos => {
    const hay = datos.genres.filter(genero => genero.name === action)

    const obj = {
      Nombre: datos.Nombre,
      imagen: datos.imagen,
      id: datos.id,
      genres: hay
    }
    return (obj)
  })
  // elimino los vacios

  return (busqueda.filter(limpiar => limpiar.genres?.length > 0))
}

const Filtro = (state) => {
  /// junto todos los filtros

  if(!state.filtro_consulta)
  {
    state.rta = state.allGames // reseteo , tengo todos
  } else{
    state.rta= state.PorRequest // reseteo , viene por request
  }
  
  let filtro = []
  console.log('reseteo')
  if (state.filtro_tipo.length > 0) {
    //  filtro para tipo
    console.log('filtro tipo')
    if (state.filtro_tipo === 'api') {
      console.log('filtro api')
      filtro = state.rta.filter(dato => !isNaN(dato.id))
    } else {
      console.log('Db filtro')
      filtro = state.rta.filter(dato => isNaN(dato.id))
    }
  }

  if (state.filtro_genre.length > 0 && filtro.length === 0) {
    // filtro para genero solo
    console.log('filtro genero simple')
    filtro = filtroGenero(state.rta, state.filtro_genre)
  }
  if (state.filtro_genre.length > 0 && filtro.length > 0) {
    // filtro compuesto
    console.log('filtro genero compuesto')
    filtro = filtroGenero(filtro, state.filtro_genre)
  }

  return filtro
}

const rootReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GETALLGAMES:
      return {
        ...state,
        loading: false,
        allGames: actions.payload,
        rta: actions.payload
      }//
    case GETALLGAMES_NAME:
      return {
        ...state,
        rta: actions.payload, // renderizo
        PorRequest:actions.payload, // cargo la request
        filtro_tipo: '',// inicializo la consulta
        filtro_genre: '',
        filtro_consulta:true,
        CurrentPage:1,
      }//
    case GET_DETAIL_GAMES:
      return {
        ...state,
        loading: false,
        rta: [], // refuerzo el desacople de rta
        filtro_tipo: '',
        filtro_genre: '',
        detail: actions.payload
      }//

      /// /////////GENRES
    case LOAD_GENRES:
      return {
        ...state,
        genres: actions.payload,
        filtered_genres: actions.payload
      }//

      /// /////////// FILTRO
    case FILTER_TIPO:{
      state.filtro_tipo = actions.payload
      const filtrado = Filtro(state)
      return {
        ...state,
        rta: filtrado
      }
    }//

    case FILTER_GENRES:
      state.filtro_genre = actions.payload
      const filtrado = Filtro(state)
      return {
        ...state,
        rta: filtrado
      }//
    case ORDER_GAMES:
    {
      const orden = [...state.rta]
      // react lo toma inmutable, se debe crear copia
      if (actions.payload === 'ascendente') {
        orden.sort((a, b) => a.Nombre.localeCompare(b.Nombre))
      } else {
        orden.sort((a, b) => b.Nombre.localeCompare(a.Nombre))
      }
      return {
        ...state,
        rta: orden
      }
    }//

    case CURRENTPAGE:

    return {
      ...state,
      CurrentPage: actions.payload
    }//



    /// /////////////// GRAL
    case SHOWLOADING:

      return {
        ...state,
        loading: true
      }//
    case CLEAN_RTA:
      return {
        ...state,
        rta: []
      }//
    case CLEAN_DETAIL:
      return {
        ...state,
        detail: {}
      }//
    case CLEANFILTER_GAMES:
      return {
        ...state,
        filtro_tipo: '',
        filtro_genre: '',
        filtro_consulta:false,
        PorRequest:[],
        // por detail
       }//
    case RESET_FILTER:
      return {
        ...state,
        filtro_tipo: '',
        filtro_genre: '',
        filtro_consulta:false,
        PorRequest:[],
        rta: state.allGames
        // boton limpiar filtros
      }//

    default:
      return {
        ...state
      }
  }
}

export default rootReducer
