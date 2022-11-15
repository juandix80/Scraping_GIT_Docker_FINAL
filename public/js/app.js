// **************************************************************************************************
// **************************************************************************************************
//                          JUAN DIEGO DÍAZ DELGADO
//                          MÓDULO: UF1846 Desarrollo de aplicaciones web distribuidas
// **************************************************************************************************
// **************************************************************************************************



// **********************************************************************************************
// **********************************************************************************************
// Para ejecutarlo, con el watch mantenemos viva la ejecución del programa y 
//    de esta forma no tenemos que matarlo cada vez que realizamos un cambio:
// node --watch src/index
// **********************************************************************************************
// **********************************************************************************************



// INICIO: CÓDIGO FUENTE
// **************************************************************************************************
// **************************************************************************************************

// Obtenemos el sitio en el HTML donde vamos a montar nuestro scrapeo
const divProductos = document.getElementById('contenido_frases');

// Especificamos la URL donde veremos el JSON de nuestro scrapeo
const URL = 'http://localhost:4000/scraper';

// Recorremos la URL para montar toda la información
fetch(URL)
    // Realizamos las diferentes promesas
    .then(response => {
        // En caso de responder devolvemos nuestro JSON para poder montar la información de nuestro 'index.html'
        return response.json();
    })
    // Realizamos la siguiente promesa y montamos la información dentro del 'index.html'
    .then(data => {
        // Recorremos nuestro JSON y montamos toda la información en formato HTML
        data.forEach(frase => {
            const contenido_producto = 
                '<div class="recuadro">' +
                    '<h2>' + 
                        '<a href="' + frase.urlAutor + '" target="_blanck">' + 
                            frase.autor +
                        '</a>' + 
                    '</h2>' +
                    '<div>' + 
                        '<p class="frase" tabindex="0">' + frase.text + '</p>' + 
                        '<a href="#inicio" id="volverInicio">Volver al menú de inicio</a>' +
                    '</div>' +
                '</div>';
            
            // Inyectamos la información, en el 'index.html', con la estructura HTML anterior
            divProductos.insertAdjacentHTML('beforeend', contenido_producto);
        });
    })
    .catch(err => console.log(err)); // En caso de error lo mostramos
// **************************************************************************************************
// **************************************************************************************************
// FIN: CÓDIGO FUENTE