const { Router } = require('express')

const genderRouter = Router()

const { getGenresHandler, getGenresLoadHandler } = require('../handlers/genresHandlers')

genderRouter.get('/', getGenresHandler)
genderRouter.get('/load/', getGenresLoadHandler)

module.exports = genderRouter
