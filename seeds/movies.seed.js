const mongoose = require('mongoose');

const Movie = require('../models/Movie');

const dbConnection = require('../db/db');


const movies = [
    {
      'title': 'The Matrix',
      'director': 'Hermanas Wachowski',
      'year': 1999,
      'genre': 'Acción',
    },
    {
      'title': 'The Matrix Reloaded',
      'director': 'Hermanas Wachowski',
      'year': 2003,
      'genre': 'Acción',
    },
    {
      'title': 'Buscando a Nemo',
      'director': 'Andrew Stanton',
      'year': 2003,
      'genre': 'Animación',
    },
    {
      'title': 'Buscando a Dory',
      'director': 'Andrew Stanton',
      'year': 2016,
      'genre': 'Animación',
    },
    {
      'title': 'Interestelar',
      'director': 'Christopher Nolan',
      'year': 2014,
      'genre': 'Ciencia ficción',
    },
    {
      'title': '50 primeras citas',
      'director': 'Peter Segal',
      'year': 2004,
      'genre': 'Comedia romántica',
    },
  ];

  const moviesDocuments = movies.map(movie => new Movie(movie));

  dbConnection
 
  // eliminar el contenido de esta colección en Mongo
 
  .then(async()=> {

    const allMovies = await Movie.find();
    if(allMovies.lenght > 0){

      await Movie.collection.drop();

    }

  })

  .catch((error)=> console.error('Error eliminando colección de Movies:', error))

  // añadir las movies de la semilla a la colección

  .then(async()=>{

    await Movie.insertMany(moviesDocuments);
  })

  .catch((error)=> console.log('Error al insertar en Movie:', error))

  // Desconectarnos de la base

  .finally(()=> mongoose.disconnect());
