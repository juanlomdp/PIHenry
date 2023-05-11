import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import Validaciones from '../../components/Validaciones/Validaciones'
import FrontValidation from '../../components/Validaciones/FrontValidation'

import Genres from '../../components/Genres/Genres'
import { CleanFilterGames, CleanRta, LoadGenres } from '../../redux/actions'
import Plataformas from '../../components/Plataformas/Plataformas'

import style from './Form.module.css'
import fondo from '../../imagen/videogame.png'

const Form = () => {
  const dispatch = useDispatch()

  const [input, setinput] = useState({
    Nombre: '',
    Descripcion: '',
    Plataformas: '',
    Fecha_lanzamiento: '',
    Rating: '',
    SearchGenre: []
  })

  const [errors, seterrors] = React.useState({})
  const [Rta, setRta] = useState({})
  const [Validacion, setValidacion] = useState([])
  const [Cargo, setCargo] = useState(false)
  const allGenres = useSelector((state) => state.genres)
  const [file, setFile] = useState(null)

  useEffect(() => {
    dispatch(LoadGenres()) // dado que se desmonta con el f5
    return () => {
      /// por si entro y salio rapido me aseguro tener limpio rta
      console.log('saliendo form')
      dispatch(CleanRta())
      dispatch(CleanFilterGames())
    }
  }, [dispatch])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const propertyNames = Object.keys(errors)
    if (!propertyNames.length > 0) {
      event.preventDefault()
      const data = new FormData()
      data.append('Nombre', input.Nombre)
      data.append('Descripcion', input.Descripcion)
      data.append('Plataformas', input.Plataformas)
      data.append('Fecha_lanzamiento', input.Fecha_lanzamiento)
      data.append('Rating', input.Rating)
      data.append('SearchGenre', input.SearchGenre)
      data.append('image', file)

      try {
        const rta = await axios.post('videogames', data)
          .then(response => {
            return (response.data)
          })

        if (rta.length === undefined) {
          // se creo o no porque ya existe
          setRta(rta)
          setCargo(false)
        } else {
          // no se creo por validaciones
          setValidacion(rta)
          setCargo(true)
        }
      } catch (error) {
        // no se creo error 404
        console.error(error.message)
      }
    }// if
  }

  const HandleChangeForm = event => {
    // seteo el input
    switch (event.target.name) {
      case 'SearchGenre':
      {
        const selectedValues = []
        const options = event.target.options
        //  calcula los options del select que tiene y busca los select true
        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            selectedValues.push(options[i].value)
          }
        }
        setinput({
          ...input,
          SearchGenre: selectedValues
        })
        break
      }//
      case 'Imagen':
      {
        // cargo la imagen selecionada
        setFile(event.target.files[0])
        break
      }//
      default:
      {
        setinput({
          ...input,
          [event.target.name]: event.target.value
        })
        break
      }
    }

    seterrors(
      FrontValidation({
        ...input,
        [event.target.name]: event.target.value
      }, file))
  }

  return (
    <>

      <div className={style.posicion}>
        <ul>
          <li className={style.cards_item}>
            <div className={style.card}>
              <div className={style.card_image}><img src={fondo} alt='fondo' /></div>
              <div className={style.card_content}>
                <h2 className={style.card_title}>Crear un Juego</h2>
                <div className={style.card_text}>
                  <form onSubmit={handleSubmit}>
                    <label>
                      Nombre:
                      <input type='text' name='Nombre' value={input.Nombre} onChange={HandleChangeForm} />
                    </label>
                    <div className={style.Error}>
                      {errors.Nombre && <div> {errors.Nombre}</div>}
                    </div>
                    <br />
                    <label>
                      Descripcion:
                      <textarea name='Descripcion' rows='10' cols='50' placeholder='Escribe la descripcion...' onChange={HandleChangeForm} value={input.Descripcion} type='text' />
                    </label>
                    <div className={style.Error}>
                      {errors.Descripcion && <div> {errors.Descripcion}</div>}
                    </div>
                    <br />
                    <label>

                      Plataformas:
                      <select name='Plataformas' defaultValue='Plataforma' onChange={HandleChangeForm}>
                        <option value='Plataforma' disabled='disabled'>Elija un Plataforma</option>
                        <Plataformas />
                      </select>
                      <div className={style.Error}>
                        {errors.Plataformas && <div> {errors.Plataformas}</div>}
                      </div>
                    </label>
                    <br />
                    <label>
                      Imagen:
                      <input name='Imagen' type='file' accept='image/jpeg' onChange={HandleChangeForm} />
                    </label>
                    <div className={style.Error}>
                      {errors.file && <div> {errors.file}</div>}
                    </div>
                    <br />
                    <label>
                      Fecha_lanzamiento:
                      <input name='Fecha_lanzamiento' type='date' value={input.Fecha_lanzamiento} onChange={HandleChangeForm} />
                    </label>
                    <div className={style.Error}>
                      {errors.Fecha_lanzamiento && <div> {errors.Fecha_lanzamiento}</div>}
                    </div>
                    <br />
                    <label>
                      Rating:
                      <input name='Rating' type='text' value={input.Rating} onChange={HandleChangeForm} />
                    </label>
                    <div className={style.Error}>
                      {errors.Rating && <div> {errors.Rating}</div>}
                    </div>
                    <br />
                    <label>
                      SearchGenre:
                      <select name='SearchGenre' onChange={HandleChangeForm} multiple>
                        <Genres allGenres={allGenres} />
                      </select>
                      <div className={style.Error}>
                        {errors.SearchGenre && <div> {errors.SearchGenre}</div>}
                      </div>
                    </label>
                    <div className={style.centrado}>
                      <button className={style.btn} type='submit'>Crear</button>
                    </div>
                  </form>
                  {/* respuesta del back   */}
                  {Cargo ? <Validaciones Validar={Validacion} /> : ''}
                  {Object.values(Rta)}
                  {/* ------- */}
                </div>
              </div>

            </div>
          </li>
        </ul>
      </div>

    </>
  )
}

export default Form
