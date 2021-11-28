const mongoose = require('mongoose');

const Schema =mongoose.Schema;

//creamos el esquema de peliculas

const movieSchema = new Schema({

    title:{type: String, required: true},
    director:{type: String},
    year:{type: Number, required: true},
    genre:{type: String, required: true}  
}, 
{
    timestamps: true,
}
);

//creamos y exportamos el modelo movie

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;