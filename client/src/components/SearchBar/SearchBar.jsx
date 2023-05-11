import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { GetAllGames_Name, ResetFilterGames, FilterByTipo, OrdenarGames, FilterByGenres } from '../../redux/actions'
import Genres from '../Genres/Genres'

import style from './SearchBar.module.css'

const SearchBar = () => {
  const dispatch = useDispatch()
  const [Input, setInput] = useState({ name: '' })
  const [Select, setSelect] = useState({
    selectTipo: 'filter',
    selectFilter: 'filter',
    selectOrden: 'filter'
  })
  const allGenres = useSelector((state) => state.genres) // obtengo los generos

  const HandleSubmit = event => {
    // envio el form
    event.preventDefault()
    const valor = Input.name
    setInput({ name: '' })
    setSelect({
      selectTipo: 'filter',
      selectFilter: 'filter',
      selectOrden: 'filter'
    }) // inicializo los filtro

    if (valor.length > 0) {
      dispatch(GetAllGames_Name(valor))
    } else {
      // query vacia cargo todo
      dispatch(ResetFilterGames())
    }
  }

  const HandleChangeForm = event => {
    // seteo el input
    setInput({
      ...Input,
      [event.target.name]: event.target.value
    })
  }

  const HandleChangeTipo = (event) => {
    // select de tipo
    setSelect({
      ...Select,
      [event.target.name]: event.target.value
    })
    dispatch(FilterByTipo(event.target.value))
  }

  const HandleChangeOrdenar = (event) => {
    // select de ordenar
    setSelect({
      ...Select,
      [event.target.name]: event.target.value
    })
    dispatch(OrdenarGames(event.target.value))
  }

  const HandleChangeGenero = (event) => {
    // select de Genres
    setSelect({
      ...Select,
      [event.target.name]: event.target.value
    })
    dispatch(FilterByGenres(event.target.value))
  }

  const HandleClickLimpiar = () => {
    setSelect({
      selectTipo: 'filter',
      selectFilter: 'filter',
      selectOrden: 'filter'
    })
    dispatch(ResetFilterGames())
  }

  return (
    <div className={style.EnLinea}>
      {/* tipo */}
      <div className={style.Margin15}>
        <select name='selectTipo' value={Select.selectTipo} onChange={HandleChangeTipo}>
          <option value='filter' disabled='disabled'>Filtro Tipo</option>
          <option value='api'>API</option>
          <option value='Db'>Db</option>
        </select>
        {/* genero */}
        <select name='selectFilter' value={Select.selectFilter} onChange={HandleChangeGenero}>
          <option value='filter' disabled='disabled'>Filtro Genero</option>
          <Genres allGenres={allGenres} />
        </select>
        {/* Orden */}

        <select name='selectOrden' value={Select.selectOrden} onChange={HandleChangeOrdenar}>
          <option value='filter' disabled='disabled'>Ordenar</option>
          <option value='ascendente'>ascendente</option>
          <option value='descendente'>descendente</option>
        </select>
      </div>
      {/* barra de busqueda */}
      <form onSubmit={HandleSubmit}>
        <input placeholder='Busqueda' name='name' value={Input.name} onChange={HandleChangeForm} type='text' />
      </form>
      <button className={style.btn} onClick={HandleClickLimpiar}> limpiar Filtro</button>

    </div>
  )
}

export default SearchBar
