const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
  Rating: String,
  ReleaseDate: Date

});

let TVseriesSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Season: {},
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
  ReleaseDate: Date

});

let userSchema = mongoose.Schema({
  Username: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', ref: 'TVseries' }]
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

let Movie = mongoose.model('Movie', movieSchema);
let TVseries = mongoose.model('TVseries', TVseriesSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.TVseries = TVseries;
module.exports.User = User;