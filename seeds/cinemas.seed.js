const mongoose = require('mongoose');

const Cinema = require('../models/Cinema');

const dbConnection = require('../db/db');


const cinemas = [
    
    {
      'name': 'Lope de Vega',
      'location': 'Valladolid',
     
    },
    {
      'name': 'Capitol',
      'location': 'Madrid',
      
    },
    
  ];

  const cinemasDocuments = cinemas.map(cinema => new Cinema(cinema));

  dbConnection
 
  // eliminar el contenido de esta colección en Mongo
 
  .then(async()=> {

    const allCinemas = await Cinema.find();
    if(allCinemas.lenght > 0){

      await Cinema.collection.drop();

    }

  })

  .catch((error)=> console.error('Error eliminando colección de Cinemas:', error))

 

  .then(async()=>{

    await Cinema.insertMany(cinemasDocuments);
  })

  .catch((error)=> console.log('Error al insertar en Cinema:', error))

  // Desconectarnos de la base

  .finally(()=> mongoose.disconnect());
