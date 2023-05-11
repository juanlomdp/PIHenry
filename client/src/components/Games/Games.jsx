import Game from '../Game/game'
import style from './games.module.css'

const Games = ({ allGames }) => {
  return (
    <div className={style.container}>
   
      {
        allGames?.map((game, key) => {
                  return (
            <div key={key}>
              <Game videogame={game} />
            </div>
          )
        })
       }
    </div>
  )
}

export default Games
