const { Router } = require('express');
const gamesRouter = require('../routes/gamesRouter') 
const postRouter = require('../routes/postRouter')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const indexRouter = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
indexRouter.use('/videogames', gamesRouter)
    
indexRouter.use('/videogames', postRouter)

module.exports = indexRouter;
