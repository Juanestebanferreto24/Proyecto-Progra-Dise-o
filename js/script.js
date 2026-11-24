/* Me gusta de las publicaciones originales */

const botones = document.querySelectorAll(".publicacion-like");

botones.forEach(function(boton) {

    let likes = 0;

    boton.addEventListener("click", function() {

        if (likes === 0) {
            likes = 1;
        } else {
            likes = 0;
        }

        boton.querySelector(".like-contador").textContent = likes;

    });

});


/* Crear publicación */

const formulario = document.getElementById("form-publicacion");

if (formulario) {

    formulario.addEventListener("submit", function(evento) {

        evento.preventDefault();

        let usuario = document.getElementById("usuario").value;
        let contenido = document.getElementById("contenido").value;
        let categoria = document.getElementById("categoria").value;

        if (usuario.trim() === "" || contenido.trim() === "" || categoria === "") {
            alert("Completa todos los campos");
            return;
        }

        let publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];

        let nueva = {
            usuario: usuario,
            contenido: contenido,
            categoria: categoria,
            likes: 0
        };

        publicaciones.push(nueva);

        localStorage.setItem("publicaciones", JSON.stringify(publicaciones));

        alert("Publicación creada");

        window.location.href = "../publicaciones/publicaciones.html";

    });

}


/* Mostrar publicaciones */

const lista = document.getElementById("listaPublicaciones");

if (lista) {

    let publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];

    publicaciones.forEach(function(publicacion, posicion) {

        let tarjeta = document.createElement("article");
        tarjeta.className = "publicacion";

        let usuario = document.createElement("h2");
        usuario.className = "publicacion-usuario";
        usuario.textContent = "@" + publicacion.usuario;

        let contenido = document.createElement("p");
        contenido.textContent = publicacion.contenido;

        let categoria = document.createElement("span");
        categoria.className = "publicacion-categoria";
        categoria.textContent = publicacion.categoria;

        // Botón para eliminar

        let eliminar = document.createElement("button");
        eliminar.textContent = "Eliminar";
        eliminar.className = "btn-eliminar";

        eliminar.addEventListener("click", function() {

            publicaciones.splice(posicion, 1);

            localStorage.setItem("publicaciones", JSON.stringify(publicaciones));

            location.reload();

        });

        // Botón de me gusta

        let botonLike = document.createElement("button");
        botonLike.className = "publicacion-like";

        let cantidadLikes = publicacion.likes || 0;

        botonLike.textContent = "♡ Me gusta " + cantidadLikes;

        botonLike.addEventListener("click", function() {

            if (cantidadLikes === 0) {
                cantidadLikes = 1;
            } else {
                cantidadLikes = 0;
            }

            publicacion.likes = cantidadLikes;

            localStorage.setItem("publicaciones", JSON.stringify(publicaciones));

            botonLike.textContent = "♡ Me gusta " + cantidadLikes;

        });

        // Organizar los botones

        let detalles = document.createElement("div");
        detalles.className = "publicacion-detalles";

        let acciones = document.createElement("div");
        acciones.className = "publicacion-acciones";

        acciones.appendChild(botonLike);
        acciones.appendChild(eliminar);

        detalles.appendChild(categoria);
        detalles.appendChild(acciones);

        tarjeta.appendChild(usuario);
        tarjeta.appendChild(contenido);
        tarjeta.appendChild(detalles);

        lista.prepend(tarjeta);

    });

}


/* Buscar y filtrar publicaciones */

const filtro = document.getElementById("filtroCategoria");
const buscador = document.getElementById("buscarPublicacion");
const limpiar = document.getElementById("limpiarBusqueda");

function filtrarPublicaciones() {

    let categoria = filtro.value.toLowerCase();
    let texto = buscador.value.toLowerCase();

    let publicaciones = document.querySelectorAll(".publicacion");

    publicaciones.forEach(function(publicacion) {

        let tipo = publicacion.querySelector(".publicacion-categoria");
        let usuario = publicacion.querySelector(".publicacion-usuario");

        if (tipo && usuario) {

            let categoriaPublicacion = tipo.textContent.toLowerCase().trim();
            let nombreUsuario = usuario.textContent.toLowerCase();

            let coincideCategoria = categoria === "todas" ||
                categoriaPublicacion === categoria;

            let coincideUsuario = nombreUsuario.includes(texto);

            if (coincideCategoria && coincideUsuario) {
                publicacion.style.display = "";
            } else {
                publicacion.style.display = "none";
            }

        }

    });

}

if (filtro && buscador) {

    filtro.addEventListener("change", filtrarPublicaciones);
    buscador.addEventListener("input", filtrarPublicaciones);

}


/* Limpiar búsqueda */

if (limpiar && filtro && buscador) {

    limpiar.addEventListener("click", function() {

        buscador.value = "";
        filtro.value = "Todas";

        filtrarPublicaciones();

    });

}