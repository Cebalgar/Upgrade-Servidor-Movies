const express = require('express');

const Cinema = require('../models/Cinema');

const router = express.Router();


// GET todos los cinemas

router.get('/', (req, res, next)=>{

    Cinema.find()
    .then((cinemas)=>{

        return res.json(cinemas);
    })
    .catch((error)=>{
        const errorOcurrido = new Error();
        return next(errorOcurrido);
    });

})

// GET que devuelve un cinema según su _id

router.get('/:id', (req , res, next)=>{

    const id = req.params.id;

    Cinema.findById(id).populate("movies")
        .then(cinema => {

            if(!cinema){

                const error = new Error(`Cinema ${id} no encontrado`);
                error.status = 404;
                return next(error);
            }
            
            return res.json(cinema);
            
        })
        .catch(error => {
           return next (new Error());
         })

})

// GET solo movies del cinema indicado

router.get('/:id/movies', (req,res,next)=>{

    const cinemaId = req.params.id;

    Cinema.findById(cinemaId).populate('movies')

    .then(cinema=>{

    if(!cinema){

        const error = new Error(`Cinema ${id} no encontrado`);
        error.status = 404;
        return next(error);
    }
    
    return res.json(cinema.movies);  
})
    .catch(error => {
    return next (error);
    })

})



// POST de Cinemas para crear un nuevo cine.

router.post('/',(req,res,next)=>{
    
        const newCinema = new Cinema({
        name: req.body.name,
        location: req.body.location,
        movies: req.body.movie || [],
    
        });

        newCinema.save()
            .then(()=>{
            return res.status(201).json(newCinema);
            })
            .catch((error)=>{
                return next(error);
            });
        
});


// Método PUT de Cinemas para modificar un cine.

router.put('/:id', (req, res, next) => {

    const error = new Error('Metodo no implementado');
    error.status = 405;
    next(error);
    
    // const cinemaId = req.params.id; 
    
    // const cinemaAModificar = new Cinema(req.body) 
    
    // cinemaAModificar._id = cinemaId;
    
    // const cinemaActualizado = Cinema.findByIdAndUpdate(cinemaId, cinemaAModificar, {new: true})
   
    // .then(cinemaActualizado=>{
    //     return res.status(200).json(cinemaActualizado);
    // })

    // .catch (error=>{

    //     return next(error);
    // });
        

});

// PUT para añadir movies a cinemas

router.put('/:id/movies', (req, res, next) => {  

   
        const cinemaId = req.params.id; 
        
        const movieId = req.body.movieAAnadir;


        
        Cinema.findByIdAndUpdate(

            cinemaId,
            {$push:{movies:movieId}},
            {new: true}
            
            )
       
        .then(cinemaActualizado=>{
            return res.status(200).json(cinemaActualizado);
        })

        .catch (error=>{

            return next(error);
        });
            
    
});


// Método DELETE  de Cinemas para eliminar un cine.

router.delete('/:id', (req, res, next) => {
   
        const cinemaId = req.params.id;
 
        Cinema.findByIdAndDelete(cinemaId)

        .then(()=>{
            return res.status(200).json(`Cinema con id ${cinemaId} eliminado!`);
        })

        .catch (error=>{

            return next(error);
        });
      
    
});




module.exports=router;


