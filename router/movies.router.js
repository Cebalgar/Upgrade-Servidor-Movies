const express = require('express');

const Movie = require('../models/Movie');

const router = express.Router();

// Endpoint GET que devuelve todas las películas.

router.get('/', (req, res)=>{

        Movie.find()
        .then((movies)=>{

            return res.json(movies);
        })
        .catch((error)=>{
            console.error('Error en GET/', error);
            return res.status(500).json('Ha ocurrido un error en el servidor');
        })

})

// Endpoint GET que devuelve una película según su _id

router.get('/:id', (req , res)=>{

    const id = req.params.id;

    Movie.findById(id)
        .then(movie => {

            if(!movie){

                return res.status(404).json('Película no encontrada');
            }
            
            return res.json(movie);
            
        })
        .catch(error => {
            console.error(`Error en GET/ ${id}`, error);

            return res.status(500).json('Ha ocurrido un error en el servidor');
         })

})

// Endpoint GET que devuelva un valor por su título

router.get('/title/:title', (req, res)=>{

    const titleSolicitado = req.params.title;

    return Movie.find({title: titleSolicitado})
    .then((movies)=>{

        return res.json(movies);
    })
    .catch((error)=>{
        console.error(`Error en GET/title/${title}`, error);
        return res.status(500).json('Ha ocurrido un error en el servidor');
    })

})

// Endpoint GET que devuelva los documentos según su género
router.get('/genre/:genre', (req, res)=>{

    const genreSolicitado = req.params.genre;

    return Movie.find({genre: genreSolicitado})
    .then((movies)=>{

        return res.json(movies);
    })
    .catch((error)=>{
        console.error(`Error en GET/title/${genre}`, error);
        return res.status(500).json('Ha ocurrido un error en el servidor');
    })

})
// Endpoint GET que devuelva las películas que se han estrenado a partir de 2010 
router.get("/year/mayorque/:year", (req,res)=>{

    const yearSolicitado = req.params.year;

    //pasamos a find la condicion que tiene que cumplirse

    return Movie.find({year: {$gte: yearSolicitado}}) //le pedimos aquellos películas cuyo campo(key) sean mayores que el año solicitado.

    .then((movies)=>{
        return res.json(movies);
    })

    .catch((error)=>{

        console.error(`Error en GET/year/${year}`, error);
        return res.status(500).json('Ha ocurrido un error en el servidor');
    })

})


module.exports = router;