

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
  Budget: String,
  Country: String,
  Language: String,
  BoxOffice: String,
  Composer:{
    Name: String,
    Bio: String
  },
  Cinematographer:{
    Name: String,
    Bio: String
  },
  Distributor: [String],
  Editor: [String],
  ProductionCompany: [String],
  ImagePath: String,
  Featured: Boolean,
  Actors: [String],
  R3playRating: [String],
  InterestingFacts: [String],
  Rating: String,
  ReleaseDate: Date,
  Duration: String,
  IMDbRating: String,
  Trailer: String,
  Website: String,
  Citations:[String]
});


let actorSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: { type: String },
  Birth: String,
  Death: String,
  CareerStarted:String,
  CareerEnded:String,
  Occupation: [String],
  Birthplace: String,
  Nationality: String,
  Nicknames: [String],
  Occupation:[String],
  YearsActive: String,
  Spouses: [String],
  NotableWorks: {
    ImagePath: String,
    Title: String,
    Description: String,
    ReleaseDate: String,
    Rating: String,
    Duration: String,
    IMDbRating: String,
    Genre: String,
  },
  AllWorks: {
    ImagePath: String,
    Title: String,
    Description: String,
    ReleaseDate: String,
    Rating: String,
    Duration: String,
    IMDbRating: String,
    Genre: String,
  },
  UnrealizedProjects:[String],
  Awards: [String],
  

  ImagePath: String,
  Featured: Boolean,
  R3playRating: [String],
  InterestingFacts: [String],
  Rating: String,
  ReleaseDate: Date,
  IMDbRating: String,
  Trailer: String,
  Website: String,
  Citations:[String]

});


let cartooneSchema = mongoose.Schema({
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
  Budget: String,
  Country: String,
  Language: String,
  BoxOffice: String,
  Composer:{
    Name: String,
    Bio: String
  },
  Cinematographer:{
    Name: String,
    Bio: String
  },
  Distributor: [String],
  Editor: [String],
  ProductionCompany: [String],
  ImagePath: String,
  Featured: Boolean,
  Actors: [String],
  R3playRating: [String],
  InterestingFacts: [String],
  Rating: String,
  Season: [String],
  ReleaseDate: Date,
  Duration: String,
  IMDbRating: String,
  Trailer: String,
  Website: String,
  Citations:[String]
});

let genreSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String },
  Subgenres: {
    Name: String,
    Description: String,
    ImagePath: String
  },
  NotableDirectors: {
    Name: String,
    Bio: String
  },
  NotableCinematographers: {
    Name: String,
    Bio: String
  },
  NotableActors: {
    Name: String,
    Bio: String,
    ImagePath: String,
    Birth: String,
    Death: String
  },
  NotableProducers: {
    Name: String,
    Bio: String,
  },
  NotableActors: {
    Name: String,
    Bio: String,
  },
  NotableComposers: {
    Name: String,
    Bio: String,
  },
  NotableScreenwriters: {
    Name: String,
    Bio: String,
  },
  NotableWorks: {
  Title: String,
  Description: String,
  ReleaseDate: String,
  InterestingFacts: [String],
  Rating: String,
  Duration: String,
  IMDbRating: String,
  ImagePath: String

},
AllWorks: {
  Title: String,
  Description: String,
  ReleaseDate: String,
  InterestingFacts: [String],
  Rating: String,
  Duration: String,
  IMDbRating: String,
  ImagePath: String


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

let directorSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: { type: String },
  Birth: Date,
  Death: Date,
  CareerStarted:Date,
  CareerEnded:Date,
  Birthplace: String,
  Nationality: String,
  Nicknames: [String],
  Occupation:[String],
  YearsActive: String,
  Spouses: String,
  NotableWorks: {
    Title: String,
    Description: String,
    ReleaseDate: Date,
    Rating: String,
    Duration: String,
    IMDbRating: String,
  
  },
  AllWorks: {
    Title: String,
    Description: String,
    ReleaseDate: Date,
    Rating: String,
    Duration: String,
    IMDbRating: String,
  
  },
  UnrealizedProjects:[String],
  Awards: [String],
  ImagePath: String,
  Featured: Boolean,
  InterestingFacts: [String],
  Rating: String,
  Trailer: String,
  Website: String,
  Citations:[String]

});

let editorSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: { type: String },
  Birth: Date,
  Death: Date,
  CareerStarted:Date,
  CareerEnded:Date,
  Birthplace: String,
  Nationality: String,
  Nicknames: [String],
  Occupation:[String],
  YearsActive: String,
  Spouses: String,
  NotableWorks: {
    Title: String,
    Description: String,
    ReleaseDate: Date,
    Rating: String,
    Duration: String,
    IMDbRating: String,
  
  },
  AllWorks: {
    Title: String,
    Description: String,
    ReleaseDate: Date,
    Rating: String,
    Duration: String,
    IMDbRating: String,
  
  },
  UnrealizedProjects:[String],
  Awards: [String],
  ImagePath: String,
  Featured: Boolean,
  InterestingFacts: [String],
  Rating: String,
  Trailer: String,
  Website: String,
  Citations:[String]

});

let composerSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: { type: String },
  Birth: Date,
  Death: Date,
  CareerStarted:Date,
  CareerEnded:Date,
  Birthplace: String,
  Nationality: String,
  Nicknames: [String],
  Occupation:[String],
  YearsActive: String,
  Spouses: String,
  NotableWorks: {
    Title: String,
    Description: String,
    ReleaseDate: Date,
    Rating: String,
    Duration: String,
    IMDbRating: String,
  
  },
  AllWorks: {
    Title: String,
    Description: String,
    ReleaseDate: Date,
    Rating: String,
    Duration: String,
    IMDbRating: String,
  
  },
  UnrealizedProjects:[String],
  Awards: [String],
  ImagePath: String,
  Featured: Boolean,
  InterestingFacts: [String],
  Rating: String,
  Trailer: String,
  Website: String,
  Citations:[String]

});

let productionCompanySchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: { type: String },
  FoundedDate: Date,
  EndDate: Date,
  Headquarters: String,
  Founder: {
    Name: String,
    Bio: String,
  },
  KeyPeople: [String],
  Nicknames: [String],
  Industry: [String],
  Divisions: [String],
  Subsidiaries: [String],
  NotableWorks: {
    Title: String,
    Description: String,
    ReleaseDate: Date,
    Rating: String,
    Duration: String,
    IMDbRating: String,
  
  },
  AllWorks: {
    Title: String,
    Description: String,
    ReleaseDate: Date,
    Rating: String,
    Duration: String,
    IMDbRating: String,
  
  },
  UnrealizedProjects:[String],
  Awards: [String],
  ImagePath: String,
  Featured: Boolean,
  InterestingFacts: [String],
  Rating: String,
  Trailer: String,
  Website: String,
  Citations:[String]

});

let producerSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: { type: String },
  Birth: Date,
  Death: Date,
  CareerStarted:Date,
  CareerEnded:Date,
  Birthplace: String,
  Nationality: String,
  Nicknames: [String],
  Occupation:[String],
  YearsActive: String,
  Spouses: String,
  NotableWorks: {
    Title: String,
    Description: String,
    ReleaseDate: Date,
    Rating: String,
    Duration: String,
    IMDbRating: String,
  
  },
  AllWorks: {
    Title: String,
    Description: String,
    ReleaseDate: Date,
    Rating: String,
    Duration: String,
    IMDbRating: String,
  
  },
  UnrealizedProjects:[String],
  Awards: [String],
  ImagePath: String,
  Featured: Boolean,
  InterestingFacts: [String],
  Rating: String,
  Trailer: String,
  Website: String,
  Citations:[String]

});

let screenWriterSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: { type: String },
  Birth: Date,
  Death: Date,
  CareerStarted:Date,
  CareerEnded:Date,
  Birthplace: String,
  Nationality: String,
  Nicknames: [String],
  Occupation:[String],
  YearsActive: String,
  Spouses: String,
  NotableWorks: {
    Title: String,
    Description: String,
    ReleaseDate: Date,
    Rating: String,
    Duration: String,
    IMDbRating: String,
  
  },
  AllWorks: {
    Title: String,
    Description: String,
    ReleaseDate: Date,
    Rating: String,
    Duration: String,
    IMDbRating: String,
  
  },
  UnrealizedProjects:[String],
  Awards: [String],
  ImagePath: String,
  Featured: Boolean,
  InterestingFacts: [String],
  Rating: String,
  Trailer: String,
  Website: String,
  Citations:[String]

});

let cinematographerSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: { type: String },
  Birth: Date,
  Death: Date,
  CareerStarted:Date,
  CareerEnded:Date,
  Birthplace: String,
  Nationality: String,
  Nicknames: [String],
  Occupation:[String],
  YearsActive: String,
  Spouses: String,
  NotableWorks: {
    Title: String,
    Description: String,
    ReleaseDate: Date,
    Rating: String,
    Duration: String,
    IMDbRating: String,
  
  },
  AllWorks: {
    Title: String,
    Description: String,
    ReleaseDate: Date,
    Rating: String,
    Duration: String,
    IMDbRating: String,
  
  },
  UnrealizedProjects:[String],
  Awards: [String],
  ImagePath: String,
  Featured: Boolean,
  InterestingFacts: [String],
  Rating: String,
  Trailer: String,
  Website: String,
  Citations:[String]

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
  Budget: String,
  Country: String,
  Language: String,
  BoxOffice: String,
  Composer:{
    Name: String,
    Bio: String
  },
  Cinematographer:{
    Name: String,
    Bio: String
  },
  Distributor: [String],
  Editor: [String],
  ProductionCompany: [String],
  ImagePath: String,
  Actors: [String],
  Featured: Boolean,
  Rating: String,
  ReleaseDate: Date,
  Season: [String],
  Trailer: String,
  IMDbRating: String,
  InterestingFacts: [String],
  Duration: String,
  Website: String,
  Citations:[String]

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
  Budget: String,
  Country: String,
  Language: String,
  BoxOffice: String,
  Composer:{
    Name: String,
    Bio: String
  },
  Cinematographer:{
    Name: String,
    Bio: String
  },
  Distributor: [String],
  Editor: [String],
  ProductionCompany: [String],
  ImagePath: String,
  Featured: Boolean,
  Actors: [String],
  Rating: String,
  Duration: String,
  IMDbRating: String,
  ReleaseDate: Date,
  InterestingFacts: [String],
  Trailer: String,
  Website: String,
  Citations:[String]

});

let userSchema = mongoose.Schema({
  Username: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Birthday: Date,
  Image: {
    type: String
},
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
let Cartoon = mongoose.model('Cartoon', cartooneSchema);
let Genre = mongoose.model('Genre', genreSchema);
let Actor = mongoose.model('Actor', actorSchema);
let Producer = mongoose.model('Producer', producerSchema);
let Director = mongoose.model('Director', directorSchema);
let ScreenWriter = mongoose.model('ScreenWriter', screenWriterSchema);
let Composer = mongoose.model('Composer', composerSchema);
let Cinematographer = mongoose.model('Cinematographer', cinematographerSchema);
let ProductionCompany = mongoose.model('ProductionCompany', productionCompanySchema);
let Editor = mongoose.model('Editor', editorSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.Anime = Anime;
module.exports.TVseries = TVseries;
module.exports.Cartoon = Cartoon;
module.exports.Genre = Genre;
module.exports.Actor = Actor;
module.exports.Producer = Producer;
module.exports.Director = Director;
module.exports.Composer = Composer;
module.exports.ScreenWriter = ScreenWriter;
module.exports.Cinematographer = Cinematographer;
module.exports.ProductionCompany = ProductionCompany;
module.exports.Editor = Editor;
module.exports.User = User;