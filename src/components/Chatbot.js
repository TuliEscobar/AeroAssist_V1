import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBBadge
} from 'mdb-react-ui-kit';
import './Chatbot.css';
import agentPrompt from '../config/agent-config';

const MODEL = "gemini-1.5-pro-latest";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

// Debug de variables de entorno
console.log('Debug de configuración:', {
  API_KEY_PRESENT: !!API_KEY,
  API_KEY_LENGTH: API_KEY?.length,
  ENV: process.env.NODE_ENV,
  ALL_ENV: process.env
});

// Validación inicial de la API key
if (!API_KEY) {
  console.error('Error: API Key no encontrada. Asegúrate de:');
  console.error('1. Tener un archivo .env en la raíz del proyecto');
  console.error('2. El archivo .env debe contener: REACT_APP_GOOGLE_API_KEY=tu_api_key');
  console.error('3. Reiniciar el servidor de desarrollo después de crear/modificar el .env');
}

const Message = ({ content, isUser, timestamp }) => {
  const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <div className={`d-flex ${isUser ? 'justify-content-end' : 'justify-content-start'} mb-3`}>
      <div className={`message ${isUser ? 'user-message' : 'bot-message'}`}>
        <div className="message-content">
          {isUser ? (
            content
          ) : (
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="markdown-heading" {...props} />,
                h2: ({node, ...props}) => <h2 className="markdown-heading" {...props} />,
                h3: ({node, ...props}) => <h3 className="markdown-heading" {...props} />,
                p: ({node, ...props}) => <p className="markdown-paragraph" {...props} />,
                ul: ({node, ...props}) => <ul className="markdown-list" {...props} />,
                li: ({node, ...props}) => <li className="markdown-list-item" {...props} />,
                strong: ({node, ...props}) => <strong className="markdown-bold" {...props} />,
                em: ({node, ...props}) => <em className="markdown-italic" {...props} />,
                code: ({node, ...props}) => <code className="markdown-code" {...props} />
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>
        <div className={`message-time small ${isUser ? 'text-white-50' : 'text-muted'}`}>
          {time}
        </div>
      </div>
    </div>
  );
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState(null);
  const [apiKeyValid, setApiKeyValid] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const chatContainerRef = useRef(null);
  const recognition = useRef(null);

  useEffect(() => {
    if (!API_KEY) {
      setApiKeyValid(false);
      setError('API Key no configurada. Contacta al administrador.');
    }

    // Inicializar reconocimiento de voz
    if ('webkitSpeechRecognition' in window) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = 'es-ES';

      recognition.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setInput(transcript);
      };

      recognition.current.onerror = (event) => {
        console.error('Error en reconocimiento de voz:', event.error);
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    const loadFaqs = async () => {
      try {
        const response = await fetch('/faqs.json');
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        console.error('Error cargando FAQs:', error);
      }
    };
    loadFaqs();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { content: userMessage, isUser: true, timestamp: new Date() }]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(API_URL, {
        contents: [
          {
            role: "user",
            parts: [{ text: agentPrompt.instructions }]
          },
          {
            role: "model",
            parts: [{ text: "Entendido. Actuaré como un especialista en aeronáutica siguiendo las instrucciones proporcionadas." }]
          },
          {
            role: "user",
            parts: [{ text: userMessage }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }, {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY
        }
      });

      if (response.data && response.data.candidates && response.data.candidates[0]) {
        const botResponse = response.data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { content: botResponse, isUser: false, timestamp: new Date() }]);
      } else {
        throw new Error('Respuesta inválida de la API');
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message || error);
      setError('Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
      if (isListening) {
        recognition.current.stop();
        setIsListening(false);
      }
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.current.stop();
    } else {
      recognition.current.start();
    }
    setIsListening(!isListening);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <MDBCard className="modern-card">
      <MDBCardHeader className="bg-transparent border-0">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <MDBIcon fas icon="robot" className="me-2 gradient-text" size="lg" />
            <h5 className="mb-0 gradient-text">AeroAssist Chat</h5>
          </div>
          <MDBBadge color="success" className="px-3 py-2">
            <MDBIcon fas icon="circle" className="me-2" size="xs" /> En línea
          </MDBBadge>
        </div>
      </MDBCardHeader>
      
      <MDBCardBody>
        <div className="messages-container">
          {messages.length === 0 && (
            <div className="welcome-message bot-message message">
              <MDBIcon fas icon="robot" className="me-2" />
              ¡Hola! Soy AeroAssist, tu asistente virtual especializado en regulaciones aeronáuticas. 
              Estoy aquí para ayudarte con cualquier consulta sobre normativas y procedimientos aeronáuticos.
            </div>
          )}
          {messages.map((message, index) => (
            <Message
              key={index}
              content={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && (
            <div className="d-flex justify-content-start">
              <div className="bot-message message">
                <MDBSpinner size="sm" color="primary" className="me-2" />
                Escribiendo...
              </div>
            </div>
          )}
        </div>
        
        {error && (
          <div className="alert alert-danger mb-3">{error}</div>
        )}

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="d-flex gap-2">
              <div className="form-outline flex-grow-1">
                <MDBIcon fas icon="comment-dots" className="chat-input-icon" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="chat-input form-control"
                  placeholder="Escribe aquí tu pregunta..."
                  disabled={isLoading}
                />
              </div>
              
              {'webkitSpeechRecognition' in window && (
                <MDBBtn 
                  color={isListening ? 'danger' : 'primary'}
                  className="px-3"
                  onClick={toggleListening}
                  type="button"
                >
                  <MDBIcon fas icon={isListening ? 'stop' : 'microphone'} />
                </MDBBtn>
              )}
              
              <MDBBtn 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-3"
              >
                <MDBIcon fas icon="paper-plane" />
              </MDBBtn>
            </div>
          </form>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default Chatbot; 