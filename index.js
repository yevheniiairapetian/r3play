const express = require('express'),
  morgan = require('morgan');

const app = express();
app.use(morgan('common'));
app.use(express.static('public'));

let movies = {
  "0": {
    "name": "Big",
    "releaseDate": "June 3, 1988",
    "actors": {
      "0": "Tom Hanks",
      "1": "Elizabeth Perkins",
      "2": "Robert Loggia",
      "3": "John Heard"
    },
    "director": "Penny Marshall",
    "rottenTomatoesRate": "98"
  },
  "1": {
    "name": "Inception",
    "releaseDate": "July 8, 2010",
    "actors": {
      "0": "Leonardo DiCaprio",
      "1": "Ken Watanabe",
      "2": "Joseph Gordon-Levitt",
      "3": "Marion Cotillard",
      "4": "Elliot Page",
      "5": "Tom Hardy",
      "6": "Cillian Murphy",
      "7": "Tom Berenger",
      "8": "Michael Caine"
    },
    "director": "Christopher Nolan",
    "rottenTomatoesRate": "87"
  },
  "2": {
    "name": "Terminator 2: Judgment Day",
    "releaseDate": "July 1, 1991",
    "actors": {
      "0": "Arnold Schwarzenegger",
      "1": "Linda Hamilton",
      "2": "Robert Patrick"
    },
    "director": "James Cameron",
    "rottenTomatoesRate": "91"
  },
  "3": {
    "name": "The Intouchables",
    "releaseDate": "September 23, 2011",
    "actors": {
      "0": "François Cluzet",
      "1": "Omar Sy"
    },
    "director": {
      "0": "Éric Toledano",
      "1": "Olivier Nakache"
    },

    "rottenTomatoesRate": "76"
  },
  "4": {
    "name": "The Fast and the Furious: Tokyo Drift",
    "releaseDate": "June 4, 2006",
    "actors": {
      "0": "Lucas Black",
      "1": "Bow Wow"
    },
    "director": "Justin Lin",

    "rottenTomatoesRate": "38"
  },
  "5": {
    "name": "The Expendables",
    "releaseDate": "August 3, 2010",
    "actors": {
      "0": "Sylvester Stallone",
      "1": "Jason Statham",
      "2": "Jet Li",
      "3": "Dolph Lundgren",
      "4": "Eric Roberts",
      "5": "Randy Couture",
      "6": "Steve Austin",
      "7": "David Zayas",
      "8": "Giselle Itié",
      "9": "Charisma Carpenter",
      "10": "Gary Daniels",
      "11": "Terry Crews",
      "12": "Mickey Rourke"
    },
    "director": "Sylvester Stallone",

    "rottenTomatoesRate": "42"
  },
  "6": {
    "name": "The Expendables 2",
    "releaseDate": "August 13, 2012",
    "actors": {
      "0": "Sylvester Stallone",
      "1": "Jason Statham",
      "2": "Jet Li",
      "3": "Dolph Lundgren",
      "4": "Chuck Norris",
      "5": "Jean-Claude Van Damme",
      "6": "Bruce Willis",
      "7": "Arnold Schwarzenegger",
      "8": "Terry Crews",
      "9": "Randy Couture",
      "10": "Liam Hemsworth",
      "11": "Scott Adkins",
      "12": "Yu Nan"
    },
    "director": "Simon West",

    "rottenTomatoesRate": "67"
  },
  "7": {
    "name": "The Expendables 3",
    "releaseDate": "August 4, 2014",
    "actors": {
      "0": "Sylvester Stallone",
      "1": "Jason Statham",
      "2": "Antonio Banderas",
      "3": "Jet Li",
      "4": "Wesley Snipes",
      "5": "Dolph Lundgren",
      "6": "Kelsey Grammer",
      "7": "Terry Crews",
      "8": "Randy Couture",
      "9": "Kellan Lutz",
      "10": "Ronda Rousey",
      "11": "Glen Powell",
      "12": "Victor Ortiz",
      "13": "Mel Gibson",
      "14": "Harrison Ford",
      "15": "Arnold Schwarzenegger"
    },
    "director": "Patrick Hughes",

    "rottenTomatoesRate": "31"
  },
  "8": {
    "name": "Kung Fu Panda",
    "releaseDate": "May 15, 2008",
    "actors": {
      "0": "Jack Black",
      "1": "Dustin Hoffman",
      "2": "Angelina Jolie",
      "3": "Ian McShane",
      "4": "Seth Rogen",
      "5": "Lucy Liu",
      "6": "David Cross",
      "7": "Randall Duk Kim",
      "8": "James Hong",
      "9": "Dan Fogler",
      "10": "Michael Clarke Duncan",
      "11": "Jackie Chan"
    },
    "director": {
      "0": "John Stevenson",
      "1": "Mark Osborne"
    },

    "rottenTomatoesRate": "87"
  },
  "9": {
    "name": "Matrix",
    "releaseDate": "March 24, 1999",
    "actors": {
      "0": "Keanu Reeves",
      "1": "Laurence Fishburne",
      "2": "Carrie-Anne Moss",
      "3": "Hugo Weaving",
      "4": "Joe Pantoliano"
    },
    "director": "The Wachowskis",

    "rottenTomatoesRate": "88"
  }



}
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

