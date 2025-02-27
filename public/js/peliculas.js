document.addEventListener('DOMContentLoaded', async () => {
    const contenedorPeliculas = document.getElementById('peliculas');

    try {
        const respuesta = await fetch('http://localhost:3000/api/peliculas');

        const peliculas = await respuesta.json();

        peliculas.forEach(pelicula => {
            const peliculaElemento = document.createElement('div');
            peliculaElemento.classList.add('pelicula');
            peliculaElemento.innerHTML = `
                <h2>${pelicula.titulo}</h2>
                <img src="${pelicula.imagen}" alt="${pelicula.titulo}">
                <p>${pelicula.descripcion}</p>
                <p><strong>Formato:</strong> ${pelicula.formato}</p>
                <p><strong>Fecha:</strong> ${pelicula.fecha}</p>
            `;
            contenedorPeliculas.appendChild(peliculaElemento);
        });
    } catch (error) {
        console.error('Error al obtener las películas:', error);
    }
});
