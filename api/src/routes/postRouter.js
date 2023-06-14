const {Router} = require ('express')
const postRouter = Router()
const {createGames} = require ('../Handlers/postHandlers')


postRouter.post('/', createGames)

module.exports = postRouter