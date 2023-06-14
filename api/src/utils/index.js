const mapInfoGame = (games) => {
    return games.map((game) => {
       return {
        name: game.name,
        description: game.description,
        platforms: game.platforms.map(plat => plat.platform.name),
        image: game.background_image,
        released: game.released,
        rating: game.rating,
        created: false,
       };
    });
}

const filterGames = (games) => {
    if(!games) return null

    else {
      return {
        name: games.name,
        description: games.description,
        platforms: games.platforms.map(plat => plat.platform.name),
        image: games.background_image,
        released: games.released,
        rating: games.rating,
      };
    }
}
const filterGamesByDB = (games) => {
    return {
      name: games.name,
      description: games.description,
      platforms: games.platforms,
      image: games.image,
      released: games.released,
      rating: games.rating,
  };
}
  
module.exports = {mapInfoGame, filterGames, filterGamesByDB}