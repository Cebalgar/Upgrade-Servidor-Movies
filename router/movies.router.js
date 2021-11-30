const express = require('express');

const Movie = require('../models/Movie');

const router = express.Router();

// Endpoint GET que devuelve todas las películas.

router.get('/', (req, res, next)=>{

        Movie.find()
        .then((movies)=>{

            return res.json(movies);
        })
        .catch((error)=>{
            const errorOcurrido = new Error();
            return next(errorOcurrido);
        })

})

// Endpoint GET que devuelve una película según su _id

router.get('/:id', (req , res, next)=>{

    const id = req.params.id;

    Movie.findById(id)
        .then(movie => {

            if(!movie){

                const error = new Error(`Película ${id} no encontrada`);
                error.status = 404;
                return next(error);
            }
            
            return res.json(movie);
            
        })
        .catch(error => {
           return next (new Error());
         })

})

// Endpoint GET que devuelva un valor por su título

router.get('/title/:title', (req, res, next)=>{

    const titleSolicitado = req.params.title;

    return Movie.find({title: titleSolicitado})
    .then((movies)=>{

        return res.json(movies);
    })
    .catch((error)=>{
        return next(new Error());
    })

})

// Endpoint GET que devuelva los documentos según su género
router.get('/genre/:genre', (req, res, next)=>{

    const genreSolicitado = req.params.genre;

    return Movie.find({genre: genreSolicitado})
    .then((movies)=>{

        return res.json(movies);
    })
    .catch((error)=>{
        return next(new Error());
    })

})
// Endpoint GET que devuelva las películas que se han estrenado a partir de 2010 
router.get("/year/mayorque/:year", (req, res, next)=>{

    const yearSolicitado = req.params.year;

    //pasamos a find la condicion que tiene que cumplirse

    return Movie.find({year: {$gte: yearSolicitado}}) //le pedimos aquellos películas cuyo campo(key) sean mayores que el año solicitado.

    .then((movies)=>{
        return res.json(movies);
    })

    .catch((error)=>{
        return next(new Error());
    })

})

// Método POST de Movies para crear una nueva película.

router.post('/',(req,res,next)=>{
    
        const newMovie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        genre: req.body.genre,

        });

        newMovie.save()
            .then(()=>{
            return res.status(201).json(newMovie);
            })
            .catch((error)=>{
                return next(error);
            });
        
});


// Método PUT de Movies para modificar una película.

router.put('/:id', (req, res, next) => {
    
        const movieId = req.params.id; 
        
        const movieAModificar = new Movie(req.body) 
        
        movieAModificar._id = movieId;
        
        const movieActualizada = Movie.findByIdAndUpdate(movieId, movieAModificar, {new: true})
       
        .then(movieActualizada=>{
            return res.status(200).json(movieActualizada);
        })

        .catch (error=>{

            return next(error);
        });
            
    
});


// Método DELETE  de Movies para eliminar una película.

router.delete('/:id', (req, res, next) => {
   
        const movieId = req.params.id;
 
        Movie.findByIdAndDelete(movieId)

        .then(()=>{
            return res.status(200).json(`Movie con id ${movieId} eliminada!`);
        })

        .catch (error=>{

            return next(error);
        });
      
    
});




module.exports = router;