/*  ME GUSTA función  */

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