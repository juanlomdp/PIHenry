const FrontValidation = (input, file) => {
  const errors = {}

  if (!(input.Nombre) || (input.Nombre.length < 6)) {
    errors.Nombre = 'Nombre debes tener ser mayor a 6'
  }

  if (!(input.Descripcion) || (input.Descripcion.length < 10)) {
    errors.Descripcion = 'Descripcion debes tener ser mayor a 10'
  }

  if (!(input.Fecha_lanzamiento) || (input.Fecha_lanzamiento.length < 9)) {
    errors.Fecha_lanzamiento = 'Debe cargar una fecha'
  }

  if (!(input.Plataformas) || (input.Plataformas.length < 1)) {
    errors.Plataformas = 'Debe cargar una Plataforma'
  }

  if (!(input.Rating) || (input.Rating.length < 2)) {
    errors.Rating = 'Debe cargar  Rating'
  }
  if (!(input.SearchGenre) || (input.SearchGenre.length < 2)) {
    errors.SearchGenre = 'Debe cargar  elegir un genero'
  }

  if (!(input.Imagen) && (file === null)) {
    // controla campo vacio y que no se haya cargado
    errors.file = 'Debe cargar  un archivo'
  }

  return errors
}

export default FrontValidation
