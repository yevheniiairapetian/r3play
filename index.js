const mongoose = require("mongoose"),
  Models = require("./models");
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/replaydb', { useNewUrlParser: true, useUnifiedTopology: true });

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

app.get("/movies", async (req, res) => {
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


app.get('/documentation', (req, res) => {
  res.sendFile('documentation.html', { root: 'public' });
});


app.get('/movies/:movieTitle', async (req, res) => {
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

app.get('/movies/genres/:genreName', async (req, res) => {
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

app.get("/movies/directors/:directorName", async (req, res) => {
  await Movies.findOne({ 'Director.Name': req.params.directorName })
    .then((movie) => {
      res.status(201).json(movie.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


app.post("/users", async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) => { res.status(201).json(user) })
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

app.post("/users/:id/:movies/:MovieID", async (req, res) => {
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

app.delete("/users/:id/:movies/:MovieID", async (req, res) => {
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

// Example of a userName



app.put("/users/:id", async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.id }, {
    $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
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

app.delete("/users/:id", async (req, res) => {
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

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
