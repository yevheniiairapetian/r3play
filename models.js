

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Movie Schema object
 * @name MovieSchema
 */
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String
  },
  ImagePath: String,
  Featured: Boolean,
  Actors: [String],
  R3playRating: [String],
  InterestingFacts: [String],
  Rating: String,
  ReleaseDate: Date,
  Duration: String,
  IMDbRating: String,
  Trailer: String

});

/**
 * TV series Schema object
 * @name TVSchema
 */
let TVseriesSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    Birth: String,
    Death: String,
  },
  ImagePath: String,
  Actors: [String],
  Featured: Boolean,
  Rating: String,
  ReleaseDate: Date,
  Season: [String],
  Trailer: String,
  IMDbRating: String,
  Duration: String,

});

/**
 * Anime Schema object
 * @name AnimeSchema
 */
let AnimeSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Season: [String],
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String
  },
  ImagePath: String,
  Featured: Boolean,
  Actors: [String],
  Rating: String,
  Duration: String,
  IMDbRating: String,
  ReleaseDate: Date,
  Trailer: String

});

let userSchema = mongoose.Schema({
  Username: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Birthday: Date,
  WatchedMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', 
  ref: 'TVseries', 
  ref: 'Anime'
 }],
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie',
   ref: 'TVseries', ref: 'Anime' 
  }]
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

let Movie = mongoose.model('Movie', movieSchema);
let Anime = mongoose.model('Anime', AnimeSchema);
let TVseries = mongoose.model('TVseries', TVseriesSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.Anime = Anime;
module.exports.TVseries = TVseries;
module.exports.User = User;