const {Router} = require('express')
const gamesRouter = Router()
const {gamesGenres, gamesById, gamesByName, allGames} = require('../Handlers/gamesHandlers')
const {createGames} = require('../Handlers/postHandlers')

gamesRouter.get('/', allGames)

gamesRouter.get('/name', gamesByName)

gamesRouter.get('/genres', gamesGenres) 

gamesRouter.get('/:id', gamesById)

gamesRouter.post('/', createGames)


module.exports = gamesRouter