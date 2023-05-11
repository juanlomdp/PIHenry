import { Link } from 'react-router-dom'
import style from './Landing.module.css'
import fondo from '../../imagen/videogame.png'

const Landing = () => {
  return (
    <div className={style.container}>
      <div className={style.box}> <Link to='/videogames/'>
        <img src={fondo} alt='fondo' />
                                  </Link>
      </div>
    </div>
  )
}

export default Landing
