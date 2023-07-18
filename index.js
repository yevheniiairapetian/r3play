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

let movies = [
  {
    name: "Big",
    releaseDate: "June 3, 1988",
    actors: ["Tom Hanks", "Elizabeth Perkins", "Robert Loggia", "John Heard"],
    genre: {name: "Comedy", description: "A comedy film is a category of film which emphasizes on humor. These films are designed to make the audience laugh in amusement. Films in this style traditionally have a happy ending (dark comedy being an exception to this rule)."},
    director: {name: "Penny Marshall", description: "Penny Marshall was born Carole Penny Marshall on October 15, 1943 in Manhattan. The Libra was 5' 6 1/2', with brown hair and green eyes. She was the daughter of Marjorie (Ward), a tap dance teacher, and Anthony 'Tony' Marshall, an industrial film director. She was the younger sister of filmmakers Garry Marshall and Ronny Hallin. Her father was of Italian descent, originally surnamed 'Masciarelli,' and her mother was of German, Scottish, English, and Irish ancestry.", birthDate:"10/15/1943", deathDate:"12/17/2018"},
    rottenTomatoesRate: 98,
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
      "Michael Caine",
    ],
    genre: {name: "Sci-Fi", description: "Science fiction (sometimes shortened to sf or sci-fi) is a genre of speculative fiction, which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life."},
    director: {name: "Christopher Nolan", description: "Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.", birthDate:"7/30/1970", "deathDate":"-"},
    rottenTomatoesRate: 87,
  },
  {
    name: "Terminator 2: Judgment Day",
    releaseDate: "July 1, 1991",
    actors: ["Arnold Schwarzenegger", "Linda Hamilton", "Robert Patrick"],
    genre: {name: "Sci-Fi", description: "Science fiction (sometimes shortened to sf or sci-fi) is a genre of speculative fiction, which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life."},
    director: {name: "James Cameron", description: "James Francis Cameron was born on August 16, 1954 in Kapuskasing, Ontario, Canada. He moved to the United States in 1971. The son of an engineer, he majored in physics at California State University before switching to English, and eventually dropping out. He then drove a truck to support his screenwriting ambition. He landed his first professional film job as art director, miniature-set builder, and process-projection supervisor on Roger Corman's Sador: Herrscher im Weltraum (1980) and had his first experience as a director with a two week stint on Fliegende Killer - Piranha II (1982) before being fired.", birthDate:"8/16/1954", "deathDate":"-"}, 
    rottenTomatoesRate: 91,
  },
  {
    name: "The Intouchables",
    releaseDate: "September 23, 2011",
    actors: ["François Cluzet", "Omar Sy"],
    genre: {name: "Biography", description: "A biographical film or biopic is a film that dramatizes the life of a non-fictional or historically-based person or people. Such films show the life of a historical person and the central character's real name is used. They differ from docudrama films and historical drama films in that they attempt to comprehensively tell a single person's life story or at least the most historically important years of their lives."},
    director: {name: "Éric Toledano", description: "Éric Toledano was born on July 3, 1971 in Paris, France. He is a writer and producer, known for Ziemlich beste Freunde (2011), Das Leben ist ein Fest (2017) and Alles außer gewöhnlich (2019).", birthDate:"7/3/1971", "deathDate":"-"},

    rottenTomatoesRate: 76,
  },
  {
    name: "The Fast and the Furious: Tokyo Drift",
    releaseDate: "June 4, 2006",
    actors: ["Lucas Black", "Bow Wow"],
    genre: {name: "Action", description: "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero."},
    director: {name: "Justin Lin", description:"Justin Lin is a Taiwanese-American film director whose films have grossed $2 billion worldwide. He is best known for his work on Better Luck Tomorrow, The Fast and the Furious 3-6 and Star Trek Beyond. He is also known for his work on television shows like Community and the second season of True Detective. Lin was born in Taipei, Taiwan, and grew up in a working-class neighborhood in Cypress, California, in Orange County. He attended Cypress High School and University of California, San Diego for two years before transferring to UCLA, where he earned a B.A. in Film & Television and a MFA in Film Directing & Production from the UCLA film school.", birthDate:"10/11/1971", "deathDate":"-"},

    rottenTomatoesRate: 38,
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
      "Mickey Rourke",
    ],
    genre: {name: "Action", description: "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero."},
    director: {name:"Sylvester Stallone", description:"Sylvester Stallone is an athletically built, dark-haired American actor/screenwriter/director/producer, the movie fans worldwide have been flocking to see Stallone's films for over 40 years, making 'Sly' one of Hollywood's biggest-ever box office draws.", birthDate:"7/6/1946", "deathDate":"-"},

    rottenTomatoesRate: 42,
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
      "Yu Nan",
    ],
    genre: {name: "Action", description: "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero."},
    director: {name: "Simon West", description: "Simon West is a British born and Hollywood based film director and producer. His films include CON AIR starring Nicholas Cage, 'THE GENERAL'S DAUGHTER' starring John Travolta and 'LARA CROFT: TOMB RAIDER' starring Angelina Jolie. West is the only live action director ever whose first three 3 films all grossed over $100m at the US box office.", birthDate:"7/17/1961", "deathDate":"-"},

    rottenTomatoesRate: 67,
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
      "Arnold Schwarzenegger",
    ],
    genre: {name: "Action", description: "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero."},
    director: {name: "Patrick Hughes", description: "Australian-born writer, producer and director Patrick Hughes continues to establish himself as one of Hollywood's most in-demand filmmakers by bringing compelling material to global audiences anchored by striking visuals and comedic storytelling.", birthDate:"5/13/1978", "deathDate":"-"},

    rottenTomatoesRate: 31,
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
      "Jackie Chan",
    ],
    genre: {name: "Animation", description: "Animation is a method by which still figures are manipulated so that they appear to be moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film. Today, many animations are made with computer-generated imagery (CGI). Computer animation can be very detailed 3D animation, while 2D computer animation (which may have the look of traditional animation) can be used for stylistic reasons, low bandwidth, or faster real-time renderings. Other common animation methods apply a stop motion technique to two- and three-dimensional objects like paper cutouts, puppets, or clay figures."},
    
    director: {name: "John Stevenson", description: "John Stevenson is known for Kung Fu Panda (2008), Middle Watch (2022) and Shrek - Der tollkühne Held (2001).", birthDate:"1958", "deathDate":"-"},

    rottenTomatoesRate: 87,
  },

  // Example adding a genre to a movie
  {
    name: "Matrix",
    releaseDate: "March 24, 1999",
    actors: [
      "Keanu Reeves",
      "Laurence Fishburne",
      "Carrie-Anne Moss",
      "Hugo Weaving",
      "Joe Pantoliano",
    ],
    
    genre: {name: "Sci-Fi", description: "Science fiction (sometimes shortened to sf or sci-fi) is a genre of speculative fiction, which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life."},
    director: {name: "TheWachowskis", description: "Lana Wachowski and her sister Lilly Wachowski, also known as the Wachowskis, are the duo behind such ground-breaking movies as Matrix (1999) and Cloud Atlas (2012). Born to mother Lynne, a nurse, and father Ron, a businessman of Polish descent, Wachowski grew up in Chicago and formed a tight creative relationship with her sister Lilly. After the siblings dropped out of college, they started a construction business and wrote screenplays. Their 1995 script, Assassins - Die Killer (1995), was made into a movie, leading to a Warner Bros contract. After that time, the Wachowskis devoted themselves to their movie careers. In 2012, during interviews for Cloud Atlas and in her acceptance speech for the Human Rights Campaign's Visibility Award, Lana spoke about her experience of being a transgender woman, sacrificing her much cherished anonymity out of a sense of responsibility. Lana is known to be extremely well-read, loves comic books and exploring ideas of imaginary worlds, and was inspired by Stanley Kubrick's 2001 - Odyssee im Weltraum (1968) in creating Cloud Atlas.", birthDate:"6/21/1965", "deathDate":"-"},

    rottenTomatoesRate: 88,
  },
];

let favoriteMovies = [];
app.get("/movies", (req, res) => {
  res.json(movies);
  //returns all movies in the response as json object
});
//==============================================================
/**
 * The way you are returning movies gives the desired movies but here you want to do other chescks to see that you found the movie before you return.
 * Secondly status codes are important
 * so for returning movie info given a name, i would restructure your code like:
 * 
 * app.get('/movies/:name', (req, res) => {
    const movieInfo = movies.find(movie =>
        movie.name.toLowerCase()  === req.params.name.toLowerCase() 
    );
    if (!movieInfo) {
      res.status(404).send('Sorry, Movie not found.');
    }
    return res.status(200).json(movie);
})
 
* 
*/

app.get('/documentation', (req, res) => {
  res.sendFile('documentation.html', { root: 'public' });
});


app.get('/movies/:name', (req, res) => {
  const movieInfo = movies.find(movie =>
      movie.name.toLowerCase()  === req.params.name.toLowerCase() 
  );
  if (!movieInfo) {
    res.status(404).send('Sorry, Movie not found.');
  }
  return res.status(200).json(movie);
})
  //returns a specific movie in the response based on its name


//==========================================
/**
 * For the end points, you would not want to pass one parameter to be passed on your end point.
 * The first point I observe is that in your data you haven't given room for genres so your endpoint won't work.
 * Therefore, you have to add genres(see example to the matrix movie) to each movie object.. like an an Object to talk about a genre. e.g genre: {name: "Comedy", description: "Funny movie"}
 * Here instead of using "/movies/:name/:genres", use ""/movies/genres/:name/"
 * Because here, you are getting a genres name so meaning that there are many genres from which you want to get a genres name...
 * The find method returns the movie info but you have to read the genre thus the code movies.find(movie => movie.genre.name === req.params.name).genre;
 * And like in the code example I gave before try to restructure your code like:
 * 
 * app.get('/movies/genres/:name', (req, res) => {
    const movieGenre = movies.find(movie =>
        movie.genre.name === req.params.name
    ).genre;
    if (!movieGenre) {
          return res.status(404).send('Sorry, we cannot find such genre.');
    }
    return res.status(200).json(movieGenre);

})
 */
app.get('/movies/genres/:name', (req, res) => {
  const movieGenre = movies.find(movie =>
      movie.genre.name === req.params.name
  ).genre;
  if (!movieGenre) {
        return res.status(404).send('Sorry, we cannot find such genre.');
  }
  return res.status(200).json(movieGenre);

})
  //returns a movie genre description in the response based on its title


// So exactly like I explained in the genres, you would use the same format like adding a director info in an object like his name, age, rating etc
/**
 * Here instead of using "/movies/:name/:directors" you would use "/movies/directors/:name"
 * To find the directors info is like I showed in the genres
 */
app.get("/movies/directors/:name", (req, res) => {
  const director = movies.find(movie =>
        movie.director.name() === req.params.name
      ).director;
      if (!director) {
        return res.status(404).send('Sorry, we cannot find such director.');
  }
  return res.status(200).json(director);
});

//==================================================================================
/*
 *Here you don't have a users array so you can't call the push method, you should initialize a users array with a few default users' dammy data or not an empty users' array(better to use one with dammy data, as you will need a put request)
 * uuid is undefined so use uuid = require('uuid'),
 * You are also not using the boadyparse to get you json req body you need to use this directly before writing your routes before they depend on json body input
 * use app.use(bodyparser.json());, you will need to install the body parser
 * Here instead of using res.status(201).send("User " + newUser + " was successfully created"); Better to send the user
 * res.status(201).send(newUser);
 */
app.post("/users", (req, res) => {
  const newUser = req.body;
  console.log(newUser);

  if (!newUser) {
    const message = "Missing user name in request body";
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
  //creates a new user with a unique ID and with a new password
});

app.post("/users/:favorites", (req, res) => {
  let chosenMovie = res.body;
  if (!chosenMovie) {
    const message = "You did not add a movie(s) to favorites";
    res.status(400).send(message);
  } else {
    favoriteMovies.push(chosenMovie);
    res
      .status(201)
      .send("Successfully added " + chosenMovie + " to the list of favorites");
  }
  //adds a favorite movies to the list of favorites
});

//Here, this end point doesn't make sense, you need to identify the user, maybe by id, or name and besides,
// Besides, the user won't have power to modify his movie contents, because the admin should have the power to do so
// May we don't need a put for such an end point
app.get("/users/:favorites", (req, res) => {
  let chosenMovie = res.body;
  let searchMovie = favoriteMovies.find((movie) => {
    return movie === req.params.favorites;
  });

  if (chosenMovie === searchMovie) {
    favoriteMovies.shift(searchMovie);
    res
      .status(201)
      .send(chosenMovie + " was successfully deleted from the favorites");
  } else {
    res.status(404).send("The movie was not found.");
  }
  //deletes a movies from the favorites list
});

// Example of a userName you should create
let users = [{
  userName: "test01",
  password: "test01",
  name: "test01",
  id: "18632bd6-5305-4c3c-9b0f-5e8e8513b887",
}];

// This won't work because first, you need to have users already, and I suggest not returning in your find Method but rather use a variable and return the variable
app.put("/users/:user", (req, res) => {
  let user = users.find(
    (
      user /**Avoid using variables with the same names, you already used "user" in your request these will cause conflicts */
    ) => {
      // Review the way I used the find, returning here inside a find isn't good
      return users.userName === req.params.user;
    }
  );

  if (user) {
    user[req.params.userName] = parseInt(req.params.userName);
    res
      .status(201)
      .send("User name succesfully changed to " + req.params.userName);
  } else {
    res
      .status(404)
      .send(
        "User with the user name " + req.params.userName + " was not found."
      );
  }
  //updates the user name
});

// This end point isn't complete, you will need a user to delete so you will either use a name or an ID
app.delete("/users", (req, res) => {
  let user = users.find((user) => {
    return user.userName === req.params.user;
  });

  if (user) {
    users = users.filter((obj) => {
      return obj.userName !== req.params.user;
    });
    res
      .status(201)
      .send("User " + req.params.user + " was successfully deleted.");
  }
  //deletes a user
});

app.get("/", (req, res) => {
  res.send("Welcome to my app!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
