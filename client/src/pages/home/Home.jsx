import Games from '../../components/Games/Games'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetAllGames, ShowLoading, CleanFilterGames, CleanRta, LoadGenres,SetCurrentPage } from '../../redux/actions'

import Loading from '../../components/Loading/Loading'
import Pagination from '../../components/Pagination/pagination'
import style from './Home.module.css'

const Home = () => {
  const dispatch = useDispatch()
  const allGames = useSelector((state) => state.rta)
  const ShowLoad = useSelector((state) => state.loading)
  const CurrentPage = useSelector((state) => state.CurrentPage)

  const GamesXPage = 15

  useEffect(() => {
    dispatch(ShowLoading())
    dispatch(GetAllGames())
    dispatch(LoadGenres()) // dado que se desmonta con el f5
    return () => {
      console.log('saliendo hom')
      dispatch(CleanRta())
      dispatch(CleanFilterGames())
    }
  }, [dispatch])

    if(allGames.length > 0){
      // hay resultados
      const IndexLastGame = CurrentPage * GamesXPage // ultimo juegp mostrar x pagina
      const IndexFirstGame = IndexLastGame - GamesXPage // 1er juegp mostrar x pagina
      const CurrentGames = allGames?.slice(IndexFirstGame, IndexLastGame)// array con la cantidad juegos a mostrar
      const paginate = (pageNumber) => {
        dispatch(SetCurrentPage(pageNumber)) 
      }

      return (
        <div className={style.container}>
          {ShowLoad
            ? <Loading />
            : <div>
              <Games allGames={CurrentGames} />
              <Pagination GamesXPage={GamesXPage} TotalGames={allGames?.length} paginate={paginate} CurrentPage={CurrentPage} />
            </div>}
        </div>
      )
    }else{
      return (
        <div className={style.container}>
        {
          ShowLoad
          ?<Loading />
          :<div> No hay resultados </div>
        }
        </div>
      )
    }
}

export default Home
