import express from 'express';
import conectarDB from './config/conexion.js';
import cors from 'cors';
import peliculasRutas from './rutas/peliculasRutas.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

conectarDB();

app.use('/api', peliculasRutas);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
