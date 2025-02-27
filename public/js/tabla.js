document.addEventListener('DOMContentLoaded', async () => {
    const tablaPeliculas = document.getElementById('tabla-peliculas');

    try {
        const respuesta = await fetch('http://localhost:3000/api/peliculas');
        const peliculas = await respuesta.json();

        peliculas.forEach(pelicula => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
               <td class="columna-titulo">${pelicula.titulo}</td>
                <td class="columna-descripcion">${pelicula.descripcion}</td>
                <td class="columna-imagen"><a href="${pelicula.imagen}" target="_blank">${pelicula.imagen}</a></td>
                <td class="columna-formato">${pelicula.formato}</td>
                <td class="columna-creador">${pelicula.creador}</td>
                <td class="columna-fecha">${new Date(pelicula.fecha).toLocaleDateString()}</td>
                <td class="columna-acciones">
                    <a href="formulario.html?id=${pelicula._id}" class="botontabla boton-editar">Editar</a>
                    <button class="botontabla boton-eliminar" data-id="${pelicula._id}">Eliminar</button>
                </td>
            `;
            tablaPeliculas.appendChild(fila);
        });

        // Evento para eliminar película
        document.querySelectorAll('.boton-eliminar').forEach(boton => {
            boton.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                if (confirm('¿Seguro que deseas eliminar esta película?')) {
                    await fetch(`http://localhost:3000/api/peliculas/${id}`, { method: 'DELETE' });
                    location.reload();
                }
            });
        });

    } catch (error) {
        console.error('Error al obtener las películas:', error);
    }
});
