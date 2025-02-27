document.addEventListener('DOMContentLoaded', async () => {
    const formulario = document.getElementById('formulario');
    const tituloInput = document.getElementById('titulo');
    const imagenInput = document.getElementById('imagen');
    const descripcionInput = document.getElementById('descripcion');
    const formatoInput = document.getElementById('formato');
    const fechaInput = document.getElementById('fecha');
    const idInput = document.getElementById('idPelicula');
    const tituloFormulario = document.getElementById('titulo-formulario');

    const urlParams = new URLSearchParams(window.location.search);
    const idPelicula = urlParams.get('id');

    if (idPelicula) {
        tituloFormulario.textContent = 'Editar Película';
        const respuesta = await fetch(`http://localhost:3000/api/peliculas/${idPelicula}`);
        const pelicula = await respuesta.json();
        tituloInput.value = pelicula.titulo;
        imagenInput.value = pelicula.imagen;
        descripcionInput.value = pelicula.descripcion;
        formatoInput.value = pelicula.formato;
    
        fechaInput.value = new Date(pelicula.fecha).toISOString().split('T')[0];
        
        idInput.value = pelicula._id;
    }
    

    formulario.addEventListener('submit', async (event) => {
        event.preventDefault();
        const pelicula = {
            titulo: tituloInput.value,
            imagen: imagenInput.value,
            descripcion: descripcionInput.value,
            formato: formatoInput.value,
            fecha: fechaInput.value
        };

        if (idInput.value) {
            await fetch(`http://localhost:3000/api/peliculas/${idInput.value}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pelicula)
            });
        } else {
            await fetch('http://localhost:3000/api/peliculas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pelicula)
            });
        }

        window.location.href = 'datos.html';
    });
});
