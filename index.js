const mongoose = require('mongoose'),
  Models = require("./models");
const Movies = Models.Movie;
const Anime = Models.Anime;
const TVseries = Models.TVseries;
const Cartoon = Models.Cartoon;
const Producer = Models.Producer;
const Genres = Models.Genre;
const Actors = Models.Actor;
const Director = Models.Director;
const Composer = Models.Composer;
const Editor = Models.Editor;
const ProductionCompany = Models.ProductionCompany;
const ScreenWriter = Models.ScreenWriter;
const Cinematographer = Models.Cinematographer;
const Users = Models.User;
require('dotenv').config();
const router = require('express').Router();

const { check, validationResult } = require('express-validator');
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// mongodb://localhost:27017/replaydb
const express = require("express"),
  morgan = require("morgan"),
  fs = require("fs"),
  path = require("path"),
  uuid = require("uuid"),
  bodyparser = require("body-parser");
  

const app = express();

app.use(express.static("public"));
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});
app.use(morgan("combined", { stream: accessLogStream }));
app.use(bodyparser.json());
const cors = require('cors');
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com','http://localhost:4200', 'http://localhost:1234', 'https://yevheniiairapetian.github.io','https://r3play.netlify.app', "https://onr3peat.com"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');


/**
 * API call to get all "/movies" returning JSON object (Returns all movies)
 * @name getMovies
 * @async
 * @param {string} /movies
 * @param {} returns all movies in the response as json object
 */
app.get("/movies", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
      //returns all movies in the response as json object
    });
});


app.get("/actors", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Actors.find()
    .then((actors) => {
      res.status(201).json(actors);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
      //returns all movies in the response as json object
    });
});


app.get("/actors/:actorName", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Actors.findOne({ Name: req.params.actorName })
    .then((Actor) => {
      res.status(201).json(Actor);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
      //returns a specific actor in the response as json object
    });
});



app.get("/genres", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Genres.find()
    .then((genres) => {
      res.status(201).json(genres);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
      //returns all movies in the response as json object
    });
});


app.get("/genres/:genreName", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Genres.findOne({ Name: req.params.genreName })
    .then((Genre) => {
      res.status(201).json(Actor);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
      //returns a specific actor in the response as json object
    });
});

// app.get('/movies/:movieTitle', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   await Movies.findOne({ Title: req.params.movieTitle })
//     .then((movie) => {
//       res.status(201).json(movie);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send('Error: ' + err);
//     });
// });

/**
 * API call to get all "/movies" returning JSON object (Returns all movies)
 * @name getAnimes
 * @async
 * @param {string} /animes
 * @param {} returns all anime in the response as json object
 * API call to get all "/anime" returning JSON object (Returns all anime)
 * @name getAnimes
 * @async
 */


app.get("/animes/", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Anime.find()
    .then((anime) => {
      res.status(201).json(anime);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
      //returns all anime in the response as json object
    });
});

/**
 * API call to get all "/movies" returning JSON object (Returns all movies)
 * @name getTVSeries
 * @async
 * @param {string} /tvseries
 * @param {} returns all TV series in the response as json object
 * API call to get all "/tvseries" returning JSON object (Returns all TV series)
 * @name getTVSeries
 * @async
 * API call to get all "/tvseries" returning JSON object (Returns all tv series)
 * @name getTVSeries
 * @async
 */
app.get("/tvseries", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await TVseries.find()
    .then((tvseries) => {
      res.status(201).json(tvseries);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
      //returns all tv series in the response as json object
    });
});

/**
 * API call to get "/" returning documentation html file
 * @name getDocumentation
 * @async
 * API call to get "/documentation" returning HTML file
 * @name getDocumentation
 * @async
 */
app.get('/documentation', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

/**
 * API call to get "/movies/movieTitle" returning json object with a movie
 * @param {string} /movies/:movieTitle
 * @param {} returns json object with a movie
 * @name getMovieTitle
 * @async
 */
app.get('/movies/:movieTitle', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.findOne({ Title: req.params.movieTitle })
    .then((movie) => {
      res.status(201).json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// app.post('/R3playRating/movies/:movieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   await Movies.findOneAndUpdate({ Title: req.params.movieID}, {
//   $push: { R3playRating: req.params.R3playRating },
// },
// { new: true }) 
//     .then((updatedMovie) => {
//       res.status(201).json(updatedMovie);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send('Error: ' + err);
//     });
// });

app.post("/users/:id/liked/:actors/:ActorID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $push: { LikedActors: req.params.ActorID },
    
  },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  //adds a favorite movies to the list of favorites
});



app.post("/users/:id/likedgenre/:genres/:GenreID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $push: { LikedGenres: req.params.GenreID },
    
  },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  //adds a favorite movies to the list of favorites
});




app.post("/users/:id/watched/:movies/:MovieID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $push: { WatchedMovies: req.params.MovieID },
    
  },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  //adds a favorite movies to the list of favorites
});

/**
 * API call to get "/animes/:animeTitle" returning json object with an anime
 * @param {string} /movies/:movieTitle
 * @param {} returns json object with an anime
 * @name getAnimeTitle
 * @async
 * API call to get "/animes/animeTitle" returning json object with an anime
 * @name getAnimeTitle
 * @async
 */

app.get('/animes/:animeTitle', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Anime.findOne({ Title: req.params.movieTitle })
    .then((anime) => {
      res.status(201).json(anime);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * API call to get "/tvseries/:tvTitle" returning json object with an TV series
 * @param {string} /movies/:movieTitle
 * @param {} returns json object with an anime
 * API call to get "/tvseries/:tvTitle" returning json object with a TV series
 * @name getTVTitle
 * @async
 */

app.get('/tvseries/:tvTitle', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await TVseries.findOne({ Title: req.params.tvTitle })
    .then((tvseries) => {
      res.status(201).json(tvseries);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * API call to get "/movies/genres/:genreName" returning json object with a movie genre name and description
 * @param {string} /movies/genres/genreName
 * @param {} returns json object with a movie genre name and description
 * @name getMovieGenre
 * @async
 */


app.get('/movies/genres/:genreName', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.findOne({ 'Genre.Name': req.params.genreName })
    .then((movie) => {
      res.status(201).json(movie.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * API call to get "/animes/genres/animeName" returning json object with an anime genre name and description
 * @param {string} /animes/genres/animeName
 * @param {} returns json object with an anime genre name and description
 * @name getAnimeGenre
 * @async
 */

app.get('/animes/genres/:animeName', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Anime.findOne({ 'Genre.Name': req.params.genreName })
    .then((anime) => {
      res.status(201).json(anime.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * API call to get "/tvseries/genres/tvName" returning json object with a tv series genre name and description
 * @param {string} /tvseries/genres/tvName
 * @param {} returns json object with a TV series genre name and description
 * @name getTVGenre
 * @async
 */

app.get('/tvseries/genres/:tvName', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await TVseries.findOne({ 'Genre.Name': req.params.genreName })
    .then((tvseries) => {
      res.status(201).json(tvseries.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/**
 * API call to get "/movies/directors/:directorName" eturning json object with a movie director name and bio
 * @param {string} /movies/directors/:directorName
 * @param {} returning json object with a movie director name and bio
 * @name getMovieDirector
 * @async
 */

app.get("/movies/directors/:directorName", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.findOne({ 'Director.Name': req.params.directorName })
    .then((movie) => {
      res.status(201).json(movie.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


/**
 * API call to get "/animes/directors/directorName" returning json object with an anime director name and bio
 * @param {string} /animes/directors/directorName
 * @param {} returning json object with an anime director name and bio
 * @name getAnimeDirector
 * @async
 */


app.get("/animes/directors/:directorName", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.findOne({ 'Director.Name': req.params.directorName })
    .then((anime) => {
      res.status(201).json(anime.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


/**
 * API call to get "/tvseries/directors/directorName" returning json object with a tv series director name and bio
 * @param {string} /tvseries/directors/directorName
 * @param {} returning json object with a tv series director name and bio
 * @name getTVDirector
 * @async
 */


app.get("/tvseries/directors/:directorName", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await TVseries.findOne({ 'Director.Name': req.params.directorName })
    .then((tvseries) => {
      res.status(201).json(tvseries.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


/**
 * API call to post "/users" returning json object with a new user
 * @param {object} {Username: string,
            Password: number,
            Email: string,
            Birthday: Date}
 * @param {} returning json object with a new user
 * @name postUser
 * @async
 */



app.post("/users", [
  check('Username', 'Username is required').isLength({ min: 5 }),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
], async (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let hashedPassword = Users.hashPassword(req.body.Password);
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
          .then((user) => { res.status(201).json({ Username: user.Username, Email: user.Email }) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

/**
 * API call to post "/users/:id/:movies/:MovieID" returning user json object with a favorite movie data
 * @param {string} /users/:id/:movies/:MovieID
 * @param {} returning user json object with a favorite movie data
 * @name postMovie
 * @async
 */

app.post("/users/:id/favorites/:movies/:MovieID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $push: { FavoriteMovies: req.params.MovieID },
    
  },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  //adds a favorite movies to the list of favorites
});


/**
 * API call to post "/users/:id/:animes/:AnimeID" returning user json object with a favorite anime data (anime gets pushed to favoriteMovies)
 * @param {string} /users/:id/:animes/:AnimeID
 * @param {} returning user json object with a favorite anime data (anime gets pushed to favoriteMovies)
 * @name postAnime
 * @async
 */


app.post("/users/:id/favorites/:animes/:AnimeID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $push: { FavoriteMovies: req.params.AnimeID },
    
  },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


/**
 * API call to post "/users/:id/:tvseries/:tvID" returning user json object with a favorite movie data (tv series gets pushed to favoriteMovies)
 * @param {string} /users/:id/:tvseries/:tvID
 * @param {} returning user json object with a favorite movie data (tv series gets pushed to favoriteMovies)
 * @name postTV
 * @async
 */

app.post("/users/:id/favorites/:tvseries/:tvID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $push: { FavoriteMovies: req.params.tvID },
    
  },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  //adds a favorite tv series to the list of favorites
});


/**
 * API call to delete "/users/:id/:movies/:MovieID" returning user json object with a deleted movie data
 * @param {string} /users/:id/:movies/:MovieID
 * @param {} returning user json object with a deleted movie data
 * @name deleteMovie
 * @async
 */

app.delete("/users/:id/favorites/:movies/:MovieID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $pull: { FavoriteMovies: req.params.MovieID },
    
  },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  //deletes a movies from the favorites list
});

/**
 * API call to delete "/users/:id/:animes/:AnimeID" returning user json object with a deleted movie data (anime gets deleted from the FavoriteMovies)
 * @param {string} /users/:id/:animes/:AnimeID
 * @param {} returning user json object with a deleted movie data (anime gets deleted from the FavoriteMovies)
 * @name deleteAnime
 * @async
 */

app.delete("/users/:id/favorites/:animes/:AnimeID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $pull: { FavoriteMovies: req.params.AnimeID },
    

  },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


/**
 * API call to delete "/users/:id/:tvseries/:tvID" returning user json object with a deleted movie data (tv series gets deleted from the FavoriteMovies)
 * @param {string} /users/:id/:tvseries/:tvID
 * @param {} returning user json object with a deleted movie data (tv series gets deleted from the FavoriteMovies)
 * @name deleteTV
 * @async
 */

app.delete("/users/:id/favorites/:tvseries/:tvID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $pull: { FavoriteMovies: req.params.tvID },
    

  },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});



/**
 * API call to post "/users/:id/:animes/:AnimeID" returning user json object with a favorite anime data (anime gets pushed to favoriteMovies)
 * @param {string} /users/:id/:animes/:AnimeID
 * @param {} returning user json object with a favorite anime data (anime gets pushed to favoriteMovies)
 * @name postAnime
 * @async
 */


app.post("/users/:id/watched/:animes/:AnimeID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $push: { WatchedMovies: req.params.AnimeID },
    
  },
    { new: true }) 
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


/**
 * API call to post "/users/:id/:tvseries/:tvID" returning user json object with a favorite movie data (tv series gets pushed to favoriteMovies)
 * @param {string} /users/:id/:tvseries/:tvID
 * @param {} returning user json object with a favorite movie data (tv series gets pushed to favoriteMovies)
 * @name postTV
 * @async
 */

app.post("/users/:id/watched/:tvseries/:tvID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $push: {  WatchedMovies: req.params.tvID },
    
  },
    { new: true }) 
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


/**
 * API call to delete "/users/:id/:movies/:MovieID" returning user json object with a deleted movie data
 * @param {string} /users/:id/:movies/:MovieID
 * @param {} returning user json object with a deleted movie data
 * @name deleteMovie
 * @async
 */

app.delete("/users/:id/watched/:movies/:MovieID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $pull: {  WatchedMovies: req.params.MovieID },
    
  },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.delete("/users/:id/liked/:actors/:ActorID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $pull: {  LikedActors: req.params.ActorID },
    
  },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});



app.delete("/users/:id/likedgenre/:genres/:GenreID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $pull: {  LikedGenres: req.params.GenreID },
    
  },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


/**
 * API call to delete "/users/:id/:animes/:AnimeID" returning user json object with a deleted movie data (anime gets deleted from the FavoriteMovies)
 * @param {string} /users/:id/:animes/:AnimeID
 * @param {} returning user json object with a deleted movie data (anime gets deleted from the FavoriteMovies)
 * @name deleteAnime
 * @async
 */

app.delete("/users/:id/watched/:animes/:AnimeID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $pull: {  WatchedMovies: req.params.AnimeID },
    

  },
    { new: true }) 
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


/**
 * API call to delete "/users/:id/:tvseries/:tvID" returning user json object with a deleted movie data (tv series gets deleted from the FavoriteMovies)
 * @param {string} /users/:id/:tvseries/:tvID
 * @param {} returning user json object with a deleted movie data (tv series gets deleted from the FavoriteMovies)
 * @name deleteTV
 * @async
 */

app.delete("/users/:id/watched/:tvseries/:tvID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $pull: {  WatchedMovies: req.params.tvID },
    

  },
    { new: true }) 
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});




/**
 * API call to put "/users/:id" returning user json object with an updated user data
 * @param {object} {Username: string,
            Password: number,
            Email: string,
            Birthday: Date}
 * @param {} returning json object with a new user
 * @name putUser
 * @async
 */


/**
 * API call to delete "/users/:id" returning user json object with a deleted user data
 * @param {string} /users/:id/
 * @param {} returning user json object with a deleted user data
 * @name deleteUser
 * @async
 */

app.delete("/users/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndRemove({ Username: req.params.id })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.id + ' was not found');
      } else {
        res.status(200).send(req.params.id + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


/**
 * API call to get "/" returning documentation html file
 * @name getDocumentation
 * @async
 */

app.get("/", (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});
