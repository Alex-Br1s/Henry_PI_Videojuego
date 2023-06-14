/*const axios = require('axios');

const URL = 'https://api.rawg.io/api/games?key=44b49cd0fe164df7afaceef7cf53ced5'


const postVideogames = async (req, res) =>{


    try {

        const {games} = req.body; 

        const infoGames = await axios.post(`${URL}${games}`)

        if(!infoGames) {
        await games.create({ name: games }); // Crea un nuevo documento de género en la base de datos
        return res.status(200).json(games);
    }
     res.status(404); throw Error("Ya esta en la lista!");

    } catch (error) {
        res.status(500).json({error: error.message})
    }
};


module.exports = {
    postVideogames
};*/
const {createNewGame} = require('../controllers/postController')

const createGames = async (req, res)=>{
    const {name, description, platforms, image, released, rating, genre_videogame} = req.body
   
    try {
        const newPostGame = await createNewGame(name, description, platforms, image, released, rating, genre_videogame)
        res.status(200).json(newPostGame)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {createGames}