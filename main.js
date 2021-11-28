require('./db/db');

const express = require('express');
moviesRouter = require('./router/movies.router')

const server = express();
const PORT = 3000;

server.use('/movies', moviesRouter);


server.use('*' , (req,res)=>{

        res.status(404),json('Not fount')

});












server.listen(PORT, ()=>{

    console.log(`Servidor arrancado en el puerto ${PORT}`);
})
