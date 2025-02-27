import mongoose from 'mongoose';

const peliculaSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    imagen: String,
    formato: String,
    creador: String,
    fecha: Date
});

export default mongoose.model('Pelicula', peliculaSchema);