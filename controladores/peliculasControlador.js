import Pelicula from '../modelos/Pelicula.js';


export const obtenerPeliculas = async (req, res) => {
    try {
        const peliculas = await Pelicula.find();
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las películas' });
    }
};


export const obtenerPeliculaPorId = async (req, res) => {
    try {
        const pelicula = await Pelicula.findById(req.params.id);
        if (!pelicula) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la película' });
    }
};

// Crear una nueva película
export const crearPelicula = async (req, res) => {
    try {
        const nuevaPelicula = new Pelicula(req.body);
        await nuevaPelicula.save();
        res.status(201).json(nuevaPelicula);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la película' });
    }
};

// Editar una película
export const actualizarPelicula = async (req, res) => {
    try {
        const peliculaActualizada = await Pelicula.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!peliculaActualizada) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        res.json(peliculaActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la película' });
    }
};

// Eliminar una película

