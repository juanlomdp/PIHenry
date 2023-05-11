const { Router } = require('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const gamesRouter = require('./gamesRouter')
const genderRouter = require('./genresRoute')

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames/', gamesRouter)
router.use('/genres/', genderRouter)



module.exports = router
