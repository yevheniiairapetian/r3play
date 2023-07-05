const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'),
  path = require('path');

const app = express();

app.use(express.static('public'));
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

let movies = [
  {
    name: "Big",
    releaseDate: "June 3, 1988",
    actors: ["Tom Hanks", "Elizabeth Perkins", "Robert Loggia", "John Heard"],
    director: "Penny Marshall",
    rottenTomatoesRate: 98
  },
  {
    name: "Inception",
    releaseDate: "July 8, 2010",
    actors: [
      "Leonardo DiCaprio",
      "Ken Watanabe",
      "Joseph Gordon-Levitt",
      "Marion Cotillard",
      "Elliot Page",
      "Tom Hardy",
      "Cillian Murphy",
      "Tom Berenger",
      "Michael Caine"
    ],
    director: "Christopher Nolan",
    rottenTomatoesRate: 87
  },
  {
    name: "Terminator 2: Judgment Day",
    releaseDate: "July 1, 1991",
    actors: [
      "Arnold Schwarzenegger",
      "Linda Hamilton",
      "Robert Patrick"
    ],
    director: "James Cameron",
    rottenTomatoesRate: 91
  },
  {
    name: "The Intouchables",
    releaseDate: "September 23, 2011",
    actors: [
      "François Cluzet",
      "Omar Sy"
    ],
    "director": [
      "Éric Toledano",
      "Olivier Nakache"
    ],

    rottenTomatoesRate: 76
  },
  {
    name: "The Fast and the Furious: Tokyo Drift",
    releaseDate: "June 4, 2006",
    actors: [
      "Lucas Black",
      "Bow Wow"
    ],
    director: "Justin Lin",

    rottenTomatoesRate: 38
  },
  {
    name: "The Expendables",
    releaseDate: "August 3, 2010",
    actors: [
      "Sylvester Stallone",
      "Jason Statham",
      "Jet Li",
      "Dolph Lundgren",
      "Eric Roberts",
      "Randy Couture",
      "Steve Austin",
      "David Zayas",
      "Giselle Itié",
      "Charisma Carpenter",
      "Gary Daniels",
      "Terry Crews",
      "Mickey Rourke"
    ],
    director: "Sylvester Stallone",

    rottenTomatoesRate: 42
  },
  {
    name: "The Expendables 2",
    releaseDate: "August 13, 2012",
    actors: [
      "Sylvester Stallone",
      "Jason Statham",
      "Jet Li",
      "Dolph Lundgren",
      "Chuck Norris",
      "Jean-Claude Van Damme",
      "Bruce Willis",
      "Arnold Schwarzenegger",
      "Terry Crews",
      "Randy Couture",
      "Liam Hemsworth",
      "Scott Adkins",
      "Yu Nan"
    ],
    director: "Simon West",

    rottenTomatoesRate: 67
  },
  {
    name: "The Expendables 3",
    releaseDate: "August 4, 2014",
    actors: [
      "Sylvester Stallone",
      "Jason Statham",
      "Antonio Banderas",
      "Jet Li",
      "Wesley Snipes",
      "Dolph Lundgren",
      "Kelsey Grammer",
      "Terry Crews",
      "Randy Couture",
      "Kellan Lutz",
      "Ronda Rousey",
      "Glen Powell",
      "Victor Ortiz",
      "Mel Gibson",
      "Harrison Ford",
      "Arnold Schwarzenegger"
    ],
    director: "Patrick Hughes",

    rottenTomatoesRate: 31
  },
  {
    name: "Kung Fu Panda",
    releaseDate: "May 15, 2008",
    actors: [
      "Jack Black",
      "Dustin Hoffman",
      "Angelina Jolie",
      "Ian McShane",
      "Seth Rogen",
      "Lucy Liu",
      "David Cross",
      "Randall Duk Kim",
      "James Hong",
      "Dan Fogler",
      "Michael Clarke Duncan",
      "Jackie Chan"
    ],
    director: [
      "John Stevenson",
      "Mark Osborne"
    ],

    rottenTomatoesRate: 87
  },
  {
    name: "Matrix",
    releaseDate: "March 24, 1999",
    actors: [
      "Keanu Reeves",
      "Laurence Fishburne",
      "Carrie-Anne Moss",
      "Hugo Weaving",
      "Joe Pantoliano"
    ],
    director: "The Wachowskis",

    rottenTomatoesRate: 88
  }



]
app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

