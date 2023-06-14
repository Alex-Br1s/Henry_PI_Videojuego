//const axios = require('axios');
//const URL = 'https://api.rawg.io/api/games?key=44b49cd0fe164df7afaceef7cf53ced5'

/*const getVideogames = async (req, res) =>{
  res.status(200).send('estoy probando las rutas')
   try {
        const response = await axios.get(URL)
        const games = response.data.results;
        if(!games) return res.status(404).send('Not games found')
        res.status(200).json(games)
    } catch (error) {
        res.status(500).json({error: error.message})
    } 
}*/
/*const getVideogamesById = async (req, res) => {
    try {
        const {id} = req.params
        const {results} = await axios.get(`${URL}/${id}`)
        const details = {
            id: results.id,
            name: results.name,
            description: results.description,
            plataform: results.plataform,
            image: results.image,
            released: results.released,
            rating: results.rating,
            genre: results.genre,
        }
        return details
        ? res.status(200).json(details)
        : res.status(400).send('Not Found details games')
    } catch (error) {
        res.status(500).send('Error: ' + error.message)
    }
}

const getVideogamesByName = async (req, res) => {
    try {
      const { name } = req.query;
      const lowerCaseName = name.toLowerCase();
  
      // Buscar en la API
      const apiResponse = await axios.get(`${URL}&search=${lowerCaseName}&page_size=15`);
      const apiGames = apiResponse.data.results;
  
      // Buscar en la base de datos
      const dbGames = await Videojuego.findAll({
        where: Sequelize.where(Sequelize.fn('lower', Sequelize.col('titulo')), 'LIKE', `%${lowerCaseName}%`),
        limit: 15
      });
  
      // Combinar resultados de la API y la base de datos
      const videogames = [...apiGames, ...dbGames];
  
      if (videogames.length === 0) {
        return res.status(404).send('No se encontraron videojuegos');
      }
  
      res.status(200).json(videogames);
    } catch (error) {
      console.error('Error al buscar videojuegos por nombre:', error);
      res.status(500).json({ error: 'Error al buscar videojuegos por nombre' });
    }
  };
  
  const getGenres = async (req, res) => {
    try {
      const response = await axios.get(`${URL}/genre`); // Hacer la solicitud a la API para obtener los géneros

      const genre = response.data; // Suponiendo que la respuesta de la API devuelve los géneros en forma de arreglo

      // Guardar los géneros en la base de datos si no existen
      for (const genre of genre) {
        const existingGenre = await Genre.findOne({ name: genre }); // Comprueba si el género ya existe en la base de datos

        if (!existingGenre) {
          await Genre.create({ name: genre }); // Crea un nuevo documento de género en la base de datos
        }
      }

      return res.status(200).json(genres);
    } catch (error) {
      console.error('Error al obtener los géneros desde la API:', error);
      return res.status(500).json({ error: 'Error al obtener los géneros desde la API' });
    }
  };

module.exports = {getVideogames, getVideogamesById, getVideogamesByName, getGenres}*/

//UN HANDLER =>>>>
//RECIBE LA RESPUESTA,
//UNIFICA DATOS, 
//DEVUELVE LAS RESPUESTAS, INVOCA AL (CONTROLLER === FUNCTION)
//NUNCA ITERACTUA CON FUENTES EXTERNAS DE INFO (API, BD),

const {getAllGames, getJuegoById, getGamesByName, getAllGenres} = require('../controllers/gamesControllers')

//TODOS LOS GAMES
const allGames = async (req, res) =>{
  try {
    const videoGames = await getAllGames();
    res.status(200).json(videoGames);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
} 

//GAMES POR ID
const gamesById = async(req, res) =>{
  const {id} = req.params;
  const source = isNaN(id) ? 'bdd' : 'api'

  try {
    const response = await getJuegoById(id, source)
    res.status(200).json(response)
  
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//GAMES POR NAME
const gamesByName = async(req, res)=>{
  const {name} = req.query
  try {
    const responseName = await getGamesByName(name)
    if(responseName.length > 0){
      res.status(200).json(responseName)
    }
    else{
      res.status(404).json({error: `No se encontro el videojuego ${name}`})
    }
  } catch (error) {
    res.status(500).json({error: error.message})
 }
}

//GENEROS DE LOS GAMES
const gamesGenres = async (req, res) =>{
  try {
    const genres = await getAllGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({error: 'Error al obtener los generos'});
  }
};
module.exports = {gamesGenres, gamesById, gamesByName, allGames}