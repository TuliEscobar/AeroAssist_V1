import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css';

const MODEL = "gemini-1.5-pro-latest";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY?.trim();

// Validación inicial de la API key
if (!API_KEY) {
  console.error('Error: API Key no encontrada. Asegúrate de:');
  console.error('1. Tener un archivo .env en la raíz del proyecto');
  console.error('2. El archivo .env debe contener: REACT_APP_GOOGLE_API_KEY=tu_api_key');
  console.error('3. Reiniciar el servidor de desarrollo después de crear/modificar el .env');
}

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState(null);
  const [apiKeyValid, setApiKeyValid] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Verificar API Key al inicio
    if (!API_KEY) {
      setApiKeyValid(false);
      setError('API Key no configurada. Contacta al administrador.');
    }
  }, []);

  useEffect(() => {
    // Cargar FAQs al iniciar
    const loadFaqs = async () => {
      try {
        console.log('Intentando cargar FAQs...');
        const response = await fetch('/faqs.json');
        const data = await response.json();
        console.log('FAQs cargados:', data);
        setFaqs(data);
      } catch (error) {
        console.error('Error cargando FAQs:', error);
      }
    };
    loadFaqs();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const construirContexto = (faqs) => {
    const contexto = faqs.map(faq => `P: ${faq.pregunta}\nR: ${faq.respuesta}`).join('\n');
    console.log('Contexto construido:', contexto);
    return contexto;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    if (!apiKeyValid) {
      setError('No se puede procesar la solicitud: API Key no válida');
      return;
    }

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const contexto = construirContexto(faqs);
      const prompt = `${contexto}\n\nPregunta: ${userMessage}\nRespuesta:`;

      const response = await axios.post(API_URL, {
        contents: [{
          parts: [{ text: prompt }]
        }]
      }, {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY
        }
      });

      if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Respuesta inválida del servidor');
      }

      const botResponse = response.data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
    } catch (error) {
      console.error('Error en la llamada a la API:', error);
      let errorMessage;
      
      if (error.response?.status === 401) {
        setApiKeyValid(false);
        errorMessage = "Error de autenticación: La API Key no es válida";
      } else if (error.response?.status === 403) {
        errorMessage = "Error de permisos: Verifica los permisos de la API Key";
      } else {
        errorMessage = error.message || "Error al procesar tu pregunta";
      }
      
      setError(errorMessage);
      setMessages(prev => [...prev, { 
        text: errorMessage,
        isUser: false 
      }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>AeroAssist Chat</h2>
        {error && <div className="error-message">{error}</div>}
        {!apiKeyValid && (
          <div className="api-key-warning">
            ⚠️ Error de configuración: API Key no válida
          </div>
        )}
      </div>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-content">
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot-message">
            <div className="message-content loading">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Haz una pregunta sobre regulaciones aeronáuticas..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Chatbot; 