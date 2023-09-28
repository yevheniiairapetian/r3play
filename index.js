const mongoose = require('mongoose'),
  Models = require("./models");
const Movies = Models.Movie;
const Anime = Models.Anime;
const TVseries = Models.TVseries;
const Users = Models.User;
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
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'http://localhost:1234', 'https://r3play.netlify.app'];

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

app.get("/anime", passport.authenticate('jwt', { session: false }), async (req, res) => {
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


app.get('/documentation', (req, res) => {
  res.sendFile('documentation.html', { root: 'public' });
});


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
//returns a specific movie in the response based on its name

app.get('/anime/:animeTitle', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Anime.findOne({ Title: req.params.movieTitle })
    .then((anime) => {
      res.status(201).json(anime);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
//returns a specific anime in the response based on its name

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
//returns a specific tv series in the response based on its name

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
//returns a movie genre description in the response based on its title

app.get('/anime/genres/:animeName', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Anime.findOne({ 'Genre.Name': req.params.genreName })
    .then((anime) => {
      res.status(201).json(anime.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
//returns a movie genre description in the response based on its title

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
//returns an anime genre description in the response based on its title

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

app.get("/anime/directors/:directorName", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.findOne({ 'Director.Name': req.params.directorName })
    .then((anime) => {
      res.status(201).json(anime.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


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
            Birthday: req.body.Birthday
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
  //creates a new user with a unique ID and with a new password
});

app.post("/users/:id/:movies/:MovieID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $push: { FavoriteMovies: req.params.MovieID }
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

app.post("/users/:id/:anime/:AnimeID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $push: { FavoriteMovies: req.params.AnimeID }
  },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  //adds a favorite anime to the list of favorites
});

app.post("/users/:id/:tvseries/:tvID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $push: { FavoriteMovies: req.params.tvID }
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


app.delete("/users/:id/:movies/:MovieID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $pull: { FavoriteMovies: req.params.MovieID }
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

app.delete("/users/:id/:anime/:AnimeID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $pull: { FavoriteMovies: req.params.AnimeID }
  },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  //deletes an anime from the favorites list
});

app.delete("/users/:id/:tvseries/:tvID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $pull: { FavoriteMovies: req.params.tvID }
  },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  //deletes a tv series from the favorites list
});

// Example of a userName



app.put("/users/:id", passport.authenticate('jwt', { session: false }), [
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
  await Users.findOneAndUpdate({ Username: req.params.id }, {
  $set:
  {
  Username: req.body.Username,
  Password: hashedPassword,
  Email: req.body.Email,
  Birthday: req.body.Birthday
  }
  },
  { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
  res.json(updatedUser);
  })
  .catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
  })
  });

//updates the user name

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


//deletes a user


app.get("/", (req, res) => {
  res.send("Welcome to the R3play app!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});
