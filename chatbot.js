const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GOOGLE_API_KEY;
const MODEL = "gemini-1.5-pro-latest";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

// Validación inicial de la API key
if (!API_KEY) {
    console.error('Error: API Key no encontrada. Asegúrate de:');
    console.error('1. Tener un archivo .env en la raíz del proyecto');
    console.error('2. El archivo .env debe contener: GOOGLE_API_KEY=tu_api_key');
    console.error('3. Reiniciar la aplicación después de crear/modificar el .env');
    process.exit(1);
}

function cargarFaqs(ruta = 'faqs.json') {
    try {
        const data = fs.readFileSync(ruta, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al cargar FAQs:', error.message);
        return [];
    }
}

function construirContexto(faqs) {
    return faqs.map(faq => `P: ${faq.pregunta}\nR: ${faq.respuesta}`).join('\n');
}

async function preguntarAlModelo(pregunta, contexto) {
    const headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY
    };
    
    const data = {
        contents: [
            {
                parts: [
                    { text: `${contexto}\n\nPregunta: ${pregunta}\nRespuesta:` }
                ]
            }
        ]
    };

    try {
        const response = await axios.post(API_URL, data, { headers });
        if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            return response.data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Respuesta inválida del servidor');
        }
    } catch (error) {
        if (error.response) {
            // Error de respuesta del servidor
            switch (error.response.status) {
                case 401:
                    return 'Error de autenticación: La API Key no es válida';
                case 403:
                    return 'Error de permisos: Verifica los permisos de la API Key';
                case 429:
                    return 'Se ha excedido el límite de solicitudes. Intenta más tarde';
                default:
                    return `Error del servidor: ${error.response.status} - ${error.response.data?.error?.message || 'Error desconocido'}`;
            }
        } else if (error.request) {
            // Error de conexión
            return 'Error de conexión: No se pudo conectar con el servidor';
        } else {
            // Otros errores
            return `Error: ${error.message}`;
        }
    }
}

(async () => {
    console.log('🛩️ ¡Bienvenido a AeroAssist! Estoy listo para responder tus preguntas sobre regulaciones aeronáuticas.');
    
    const faqs = cargarFaqs();
    if (faqs.length === 0) {
        console.log('⚠️ Advertencia: No se pudieron cargar las FAQs. El chatbot funcionará con conocimiento limitado.');
    }
    
    const contexto = construirContexto(faqs);
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function preguntar() {
        readline.question("\nHaz una pregunta sobre regulaciones aeronáuticas (o 'salir'): ", async (pregunta) => {
            if (pregunta.toLowerCase() === 'salir') {
                console.log('\n¡Gracias por usar AeroAssist! ¡Hasta pronto! ✈️');
                readline.close();
            } else {
                console.log('\nProcesando tu pregunta...');
                const respuesta = await preguntarAlModelo(pregunta, contexto);
                console.log(`\n✈️ Respuesta: ${respuesta}`);
                preguntar();
            }
        });
    }

    preguntar();
})();