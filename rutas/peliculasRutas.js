import express from 'express';
import {
    obtenerPeliculas,
    obtenerPeliculaPorId,
    crearPelicula,
    actualizarPelicula,
    eliminarPelicula
} from '../controladores/peliculasControlador.js';

const router = express.Router();

router.get('/peliculas', obtenerPeliculas);
router.get('/peliculas/:id', obtenerPeliculaPorId);
router.post('/peliculas', crearPelicula);
router.put('/peliculas/:id', actualizarPelicula);
router.delete('/peliculas/:id', eliminarPelicula);

export default router;
