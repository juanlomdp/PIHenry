const { GetGenres, LoadGenres } = require('../controller/genresController')

const getGenresHandler = async (req, res) => {
  ///  solicito la info a la api y cargo la db con los nombres
  try {
    const response = await GetGenres()
    res.status(200).json(response)
  } catch (error) {
    res.status(400).send(error.message)
  }
}
const getGenresLoadHandler = async (req, res) => {
  /// solicito los nombres de la DB
  try {
    const response = await LoadGenres()
    res.status(200).json(response)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = {
  getGenresHandler,
  getGenresLoadHandler
}
