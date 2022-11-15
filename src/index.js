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

// Obtenemos los paquetes necesarios para realizar el ejercicio
const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const {join} = require('path');
const cors = require('cors');

// Creamos las variables del entorno
const app = express(); // Para trabajar directamente con express
const PORT = 4000; // El puerto por defecto
const URL = 'https://quotes.toscrape.com/'; // La URL de donde sacaremos la información

// Especificamos la ruta de donde sacará la información a utilizar
app.use(express.static(join(__dirname, '../public')));

// Con Cors corregimos el problema de la carga de la página web si ejecutamos el index.html sólamente
app.use(cors());

// Especificamos la URL para visualizar el JSON con la información
app.get('/scraper', (req, res) => {
    axios(URL) // Especificamos la URL que queremos scrapear
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html); // Cargamos la URL que queremos scrapear

        // Array con que contendrá toda la información que queremos mostrar en el HTML
        const frases = [];

        // Especificamos que para poder Scrapear la información utilizaremos la clase 'quote'
        $('.quote', html).each( function() {
            // Obtenemos toda la información scrapeándola de la página web
            const autor = $(this).find('.author').text();
            const text = $(this).find('.text').text();
            const urlAutor = URL + $(this).find('a').attr('href');

            // Introducimos la información el array para crear una frase con todas sus variables y contenido
            frases.push({autor, text, urlAutor});
        });

        // Mostramos por pantalla el JSON con la información que hemos montado en el array
        res.json(frases);
    })
    .catch(err => console.log(err)) // En caso de error lo mostramos
});

// Especificamos por el puerto que queremos escuchar la información que queremos mostrar
app.listen(PORT, () => 
    console.log(`Escuchando en el puerto ${PORT}`)
);
// **************************************************************************************************
// **************************************************************************************************
// FIN: CÓDIGO FUENTE