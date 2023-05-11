import { Link } from 'react-router-dom'
import style from './game.module.css'

const Game = ({ videogame }) => {

  const { id, Nombre, genres, imagen, } = videogame
  return (

    <div key={id}>

      <main>
        <div className={style.card}>
          <img src={imagen} width='100' height='auto' alt='api' />
          <div>
            <h2>
              {Nombre}
            </h2>
            <span>
              {genres.map((dato, key) => {
                /// generos
                return (<div key={key}>   {dato.name} <br />  </div>)
              })}
            </span>

            <Link to={`/detail/${id}`}> <div className={style.button}>Ver detalle</div>  </Link>
          </div>
        </div>
      </main>
    </div>

  )
}

export default Game
