/* eslint-disable react/jsx-indent */
import { Link, useLocation } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'

import style from './Nav.module.css'
import { useSelector } from 'react-redux'

const Nav = () => {
  const ShowLoad = useSelector((state) => state.loading)
  const location = useLocation()
  return (
    <>
      {ShowLoad
        ? ''
        : <div className={style.topnav}>
          <Link to='videogames'> Home</Link>
          <Link to='form'> Nuevo Juego</Link>
          {
            location.pathname.includes('videogames') ? <div>  <SearchBar /> </div> : <div>  </div>
            }
          </div>}
    </>
  )
}

export default Nav
