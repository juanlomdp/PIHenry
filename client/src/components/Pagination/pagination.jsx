/* eslint-disable jsx-a11y/anchor-is-valid */
import style from './pagination.module.css'

const Pagination = ({ GamesXPage, TotalGames, paginate, CurrentPage }) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(TotalGames / GamesXPage); i++) {
    pageNumbers.push(i) // cargo la cantidad de paginas que van existir
  }
  const TotalPaginas= pageNumbers.length
  return (
    <div className={style.oneline}>
    {
      CurrentPage>1?<div> <a onClick={() => paginate(CurrentPage-1)} href='#'>anterior</a></div>:''
    }

    <div className={style.pagination}>
      {
        pageNumbers.map(numero => {
          if (CurrentPage === numero) {
            return (
              <div className={style.active} key={numero}>
                <a onClick={() => paginate(numero)} href='#'>{numero}</a>
              </div>
            )
          } else {
            return (
              <div key={numero}>
                <a onClick={() => paginate(numero)} href='#'>{numero}</a>
              </div>
            )
          }
        })
        }
    </div>

    
    {
      console.log(TotalPaginas >= CurrentPage)
    }
    {
      CurrentPage < TotalPaginas?<div> <a onClick={() => paginate(CurrentPage+1)} href='#'>siguiente</a></div>:''
    }
    </div>
  )
}

export default Pagination
