const {Videogame, Genres} = require('../db')

const createNewGame = async (name, description, platforms, image, released, rating, genre_videogame) => {
   try {

       const newGame = await Videogame.create({ name, description, platforms, image, released, rating, genre_videogame});
       if (genre_videogame && genre_videogame.length > 0) {
           const genres = await Genres.findAll({ where: { id: genre_videogame } });
           await newGame.addGenres(genres);
        }
        return newGame
   } catch (error) {
    throw new Error('Error al crear el videojuego')
   }
};
module.exports = {createNewGame}