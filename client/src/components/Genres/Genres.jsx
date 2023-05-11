const Genres = (TodosGeneros) => {
  const { allGenres } = TodosGeneros

  return (
    <>

      {allGenres?.map((option, key) => (
        <option key={key} value={option.Nombre}>{option.Nombre}</option>
      ))}
    </>
  )
}

export default Genres
