const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GOOGLE_API_KEY;
const MODEL = "gemini-1.5-pro-latest";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

function cargarFaqs(ruta = 'faqs.json') {
    const data = fs.readFileSync(ruta, 'utf-8');
    return JSON.parse(data);
}

function construirContexto(faqs) {
    return faqs.map(faq => `P: ${faq.pregunta}\nR: ${faq.respuesta}`).join('\n');
}

async function preguntarAlModelo(pregunta, contexto) {
    const headers = { "Content-Type": "application/json" };
    const prompt = `${contexto}\n\nPregunta: ${pregunta}\nRespuesta:`;

    const data = {
        contents: [
            {
                parts: [
                    { text: prompt }
                ]
            }
        ]
    };

    try {
        const response = await axios.post(API_URL, data, { headers });
        if (response.status === 200) {
            const mensaje = response.data;
            return mensaje.candidates[0].content.parts[0].text;
        } else {
            return `Error: ${response.status} - ${response.statusText}`;
        }
    } catch (error) {
        return `Error: ${error.response.status} - ${error.response.data}`;
    }
}

(async () => {
    const faqs = cargarFaqs();
    const contexto = construirContexto(faqs);

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function preguntar() {
        readline.question("\nHaz una pregunta sobre regulaciones aeronáuticas (o 'salir'): ", async (pregunta) => {
            if (pregunta.toLowerCase() === 'salir') {
                readline.close();
            } else {
                const respuesta = await preguntarAlModelo(pregunta, contexto);
                console.log(`\n✈️ Respuesta: ${respuesta}`);
                preguntar();
            }
        });
    }

    preguntar();
})();