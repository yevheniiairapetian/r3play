# r3play

## Description
This project contains an R3play web API that allows users to access information about different movies, TV series, and anime from a MongoDB Database. It is used by the R3play front-end [here](https://github.com/yevheniiairapetian/r3play-client) and the myFlix-Angular-App front-end [here](https://github.com/yevheniiairapetian/myFlix-Angular-client)

## Technologies Used
- Javascript
- Node.js
- Express
- Mongoose
- Body Parser
- MongoDB
- Heroku
- Postman
- UUID
- _Please see the package.json file for other project dependecnies_


## Features
### Allows to:
#### User Features
- Register a user with a secure hashed password
- Log in as a user
- Deregister user
- Update user information (username, password, email, birthday)
#### Movie features
##### Access information about different movies including 
- Title
- Description
- Genre (name and description)
- Director (name, bio, birth year, and death year)
- Release year
- Rating (Rotten Tomatoes Audience and IMDb) 
- List of actors
- Duration
- Interesting facts
- Etc
#### Anime and TV series features
##### Access information about different anime and TV series including 
- Title
- Description
- Episodes
- Genre (name and description)
- Director (name, bio, birth year, and death year)
- Release year
- Rating (Rotten Tomatoes Audience and IMDb) 
- List of actors
- Duration
- Interesting facts
- Etc
#### Movie, anime, and TV series features
- Add a movie, TV series, or anime to your favorites list (single FavoriteMovies array)
- Delete a movie, TV series, or anime from the favorites list (single FavoriteMovies array)

## Project Dependencies
- Body-parser as a parsing middleware
- Express/Node.js for the backend
- Mongoose for the schemas
- Cors for enabling the CORS policies
- Postman for testing HTTP requests and responses
- JSDOC for documentation
- UUID for generating unique IDs
- Heroku for deployment
- Mongo DB as a database
- _Please find other project dependencies in the package.json file_
      
## Project In Use Preview
_Please click on the video below to watch it_   

[![Watch the video](https://i.ibb.co/C1mSB2M/2023-10-22-16h13-32.png)](https://streamable.com/axny8v)


## Documentation
For more information on how to use the R3play API please refer to the [R3play Documentation](https://yevheniiairapetian.github.io/r3play-documentation/)

## Live Version
The API is live at [http://www.r3play-api.com/](http://www.r3play-api.com/)

## Clone and Preview 
To clone the app use the following command:
```console git clone git@github.com:yevheniiairapetian/r3play.git```
Or download directly by clicking on <> Code button > Download ZIP. 
Install the required dependencies using the ```npm install``` command. Use the ```node index.js``` or ```nodemon index.js``` terminal commands to run the project.
Please refer to the [documentation](https://r3play-934f9ea5664d.herokuapp.com/documentation) for more information.

## Contact:
Feel free to contact me via[ LinkedIn](https://www.linkedin.com/in/yevheniiairapetian/) or [email](mailto:contact@yevheniiairapetian.com) or via the contact form on my [portfolio](https://yevheniiairapetian.com/#/contact) 
