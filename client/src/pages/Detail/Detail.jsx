/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable multiline-ternary */
/* eslint-disable react/jsx-closing-tag-location */
import { useParams } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { ShowLoading, setGameDetail, CleanRta, CleanDetail, CleanFilterGames } from '../../redux/actions'
import Loading from '../../components/Loading/Loading'

import style from './Detail.module.css'

const Detail = () => {
  const { id } = useParams()
  const ShowLoad = useSelector((state) => state.loading)
  const dispatch = useDispatch()
  const GameDetail = useSelector((state) => state.detail)
  /// por si entro y salgo rapido me aseguro tener limpio rta
  useEffect(() => {
    dispatch(ShowLoading())
    dispatch(setGameDetail(id))
    return () => {
      dispatch(CleanDetail())
      dispatch(CleanRta())
      dispatch(CleanFilterGames())
    }
  }, [id])

  return (
    <>
      {ShowLoad ? <Loading />
        : <div className={style.posicion}>
          <ul>
            <li className={style.cards_item}>
              <div className={style.card}>
                <div className={style.card_image}>

           <img src={GameDetail.imagen} alt={GameDetail.Nombre} />
  

                </div>
                <div className={style.card_content}>
                  <h2 className={style.card_title}>{GameDetail.Nombre}</h2>
                  <h2 className={style.card_title2}>
                    <div>
                      {/* si es por db o por api */}
                      {isNaN(GameDetail.id)
                        ? GameDetail.Plataformas
                        : GameDetail.Plataformas?.map(valor => {
                          return (valor.platform.name + ' / ')
                        })}

                    </div>

                  </h2>
                  <div className={style.card_text}>
                    <p> {GameDetail.Descripción}  </p>
                    <p> Fecha Lanzamiento : {GameDetail.Fecha_lanzamiento} </p>
                    <p>    <div>Rating :{
          isNaN(GameDetail.id)
            ? GameDetail.Rating
            : GameDetail.Rating?.map(valor => {
              return (' ' + valor.title + ' / ')
            })
        }
                    </div>
                    </p>
                    <p>
                      <div>
                        Generos:
                        {
        isNaN(GameDetail.id)
          ? GameDetail.genres?.map(valor => {
            return (' ' + valor.Nombre + ' / ')
          })

          : GameDetail.genres?.map(valor => {
            return (' ' + valor.name + ' / ')
          })
      }
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>

        </div>}
    </>
  )
}

export default Detail
