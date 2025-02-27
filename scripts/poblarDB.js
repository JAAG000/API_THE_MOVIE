import mongoose from 'mongoose';
import Pelicula from '../modelos/Pelicula.js';
import fetch from 'node-fetch';

const MONGO_URI = 'mongodb://localhost:27017/api_the_movie';

const obtenerPeliculas = async () => {
    const apiKey = 'd430b63c65531db1dc2931e6429bcd77';
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es&page=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return data.results.map(pelicula => ({
            titulo: pelicula.original_title,
            descripcion: pelicula.overview,
            imagen: pelicula.poster_path ? `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}` : '',
            formato: "HD",
            creador: "Desconocido",
            fecha: pelicula.release_date ? pelicula.release_date.split('-')[0] : "N/A"
        }));
    } catch (error) {
        console.error("Error al obtener las películas:", error);
        return [];
    }
};

const poblarDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        const peliculas = await obtenerPeliculas();
        await Pelicula.insertMany(peliculas);
        console.log('Base de datos poblada con datos de la API');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
    }
};

poblarDB();
