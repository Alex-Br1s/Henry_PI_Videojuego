const axios = require("axios");
const { Videogame, Genres } = require("../db");
const {Op} = require('sequelize')
const {mapInfoGame, filterGames ,filterGamesByDB} = require('../utils/index')
const {ME_API_KEY, URL} = process.env

//Funcion que tiene los videojuegos
const getAllGames = async () => {//https://api.rawg.io/api/games?key=44b49cd0fe164df7afaceef7cf53ced5
  try {
    const responseGame = await axios.get(`${URL}?key=${ME_API_KEY}`)
    const gamesFromApi = responseGame.data.results
    const filteredInfo = mapInfoGame(gamesFromApi)
    const games = await Videogame.findAll();
    return [...games, ...filteredInfo]
  } catch (error) {
    throw new Error('Error al obtener los videojuegos');
  }
};


//Funcion que busca los videojuegos por Id
const getJuegoById = async (id, source) => {
  let juegos;

  if (source === 'api') {
    const response = await axios.get(`${URL}/${id}?key=${ME_API_KEY}`);
    juegos = response.data;
    return filterGames(juegos)
  } else {
    juegos = await Videogame.findByPk(id);
    return filterGamesByDB(juegos)
  }
  // Filtrar la informacion específica del videojuego
  
};
//Funcion que busca los videojuegos por nombres
const getGamesByName= async (name) => {
  const nameLower = name.toLowerCase();
  try {               
    const responseApi = (await axios.get(`${URL}?search=${nameLower}&limit=15&key=${ME_API_KEY}`));
    const dbResults = (await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${nameLower}%`
        }
      }, 
      limit: 15
    }));
    const filteredInfo = mapInfoGame(responseApi.data.results);
    return [...filteredInfo, ...dbResults];
  } catch (error) {
    throw new Error('Error en la búsqueda del videojuego');
  }
};

//Obtenemos lo generos de los videojuegos
const getAllGenres = async () => {//https://api.rawg.io/api/videojuegos
  try {
    const response = await axios.get(`https://api.rawg.io/api/genres?key=${ME_API_KEY}`);
    const genres = response.data; // Suponiendo que la API devuelve un arreglo de generos

    await Genres.bulkCreate(genres); // Guardar los generos en la base de datos

    return genres;
  } catch (error) {
    throw new Error('Error al obtener y guardar los géneros.');
  }
};


module.exports = {getAllGames, getJuegoById, getGamesByName, getAllGenres};

/* const getGenresFromApi = async () => {
  const response = await axios.get(`${URL}?key=${ME_API_KEY}`);
  const genres = response.data; // Suponiendo que la API devuelve un arreglo de generos

  const saveGenresToDatabase = async (genres) => {
    await Genres.bulkCreate(genres);
  };

  const getAllGenres = async () => {
    try {
      await saveGenresToDatabase(genres); // Guardar los generos en la base de datos
      return genres;
    } catch (error) {
      throw new Error('Error al obtener y guardar los géneros.');
    }
  };

  return getAllGenres();
}; */