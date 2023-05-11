import axios from 'axios'

export const GETALLGAMES = 'GETALLGAMES'
export const SHOWLOADING = 'SHOWLOADING'
export const GET_DETAIL_GAMES = 'GET_DETAIL_GAMES'
export const GETALLGAMES_NAME = 'GETALLGAMES_NAME'
export const CLEANFILTER_GAMES = 'CLEANFILTER_GAMES'
export const FILTER_TIPO = 'FILTER_TIPO'
export const FILTER_GENRES = 'FILTER_GENRES'
export const CLEAN_RTA = 'CLEAN_RTA'
export const RESET_FILTER = 'RESET_FILTER'
export const LOAD_GENRES = 'LOAD_GENRES'
export const ORDER_GAMES = 'ORDER_GAMES'
export const CLEAN_DETAIL = 'CLEAN_DETAIL'
export const CURRENTPAGE = 'CURRENTPAGE'

export const GetAllGames = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('videogames')
      return dispatch({
        type: GETALLGAMES,
        payload: response.data
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}

export const setGameDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`videogames/${id}`)
      return dispatch({
        type: GET_DETAIL_GAMES,
        payload: response.data
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}

export const GetAllGames_Name = (value) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`videogames/name?name=${value}`)
      console.log(response.status);
      if (response.status === 200)
      {
        return dispatch({
          type: GETALLGAMES_NAME,
          payload: response.data
        })
      }
      if (response.status === 201)
      {
        return dispatch({
          type: GETALLGAMES_NAME,
          payload: []
        })
      }
    } catch (error) {
      console.log(error.message)
    }
  }
}

export const FilterByTipo = (value) => {
  return (dispatch) => {
    return dispatch({
      type: FILTER_TIPO,
      payload: value
    })
  }
}//

export const FilterByGenres = (value) => {
  return (dispatch) => {
    return dispatch({
      type: FILTER_GENRES,
      payload: value
    })
  }
}//
export const OrdenarGames = (value) => {
  return (dispatch) => {
    return dispatch({
      type: ORDER_GAMES,
      payload: value
    })
  }
}

export const SetCurrentPage = (value) => {
  return (dispatch) => {
    return dispatch({
      type: CURRENTPAGE,
      payload: value
    })
  }
}


/// //////////

export const LoadGenres = () => {
// carga todos lo generos de la DB
  return async (dispatch) => {
    try {
      const response = await axios.get('genres/load/')
      return dispatch({
        type: LOAD_GENRES,
        payload: response.data
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}//

export const ShowLoading = () => {
  return (dispatch) => {
    return dispatch({
      type: SHOWLOADING
    })
  }
}

export const CleanFilterGames = () => {
  // solo limpio filtros
  return (dispatch) => {
    return dispatch({
      type: CLEANFILTER_GAMES
    })
  }
}

export const ResetFilterGames = () => {
  /// limpio filtros y cargo con todo a rta
  return (dispatch) => {
    return dispatch({
      type: RESET_FILTER
    })
  }
}

export const CleanDetail = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAN_DETAIL
    })
  }
}

export const CleanRta = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAN_RTA
    })
  }
}
