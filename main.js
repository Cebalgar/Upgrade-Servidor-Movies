require('./db/db');

const express = require('express');
const moviesRouter = require('./router/movies.router');
const cinemasRouter = require('./router/cinemas.router')
const server = express();
const PORT = 3000;

// Middlewares para entender los json bodys.
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Middleware de enrutado para /movies.
server.use('/movies', moviesRouter);

// Middleware de enrutado para /cinemas.
server.use('/cinemas', cinemasRouter);


// Middlewares de enrutado para rutas no existentes.
server.use('*' , (req, res, next)=>{

        const error = new Error('Ruta no encontrada')
        error.status = 404;
        next(error)

});

// Manejador/Middleware de errores
server.use((err, req, res, next) => {

    console.error('[ERROR] Ha ocurrido un error', err.status, err.message);
    return res.status(error.status || 500).json(err.message || 'Ha ocurrido un error en el servidor');
  });
  



server.listen(PORT, ()=>{

    console.log(`Servidor arrancado en el puerto ${PORT}`);
})
