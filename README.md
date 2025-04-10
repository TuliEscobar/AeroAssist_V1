# 🛩️ AeroAssist V1

Chatbot de asistencia para regulaciones aeronáuticas desarrollado por Héctor Escobar, utilizando la API de Google Gemini y Firebase.

## 📋 Información del Desarrollador
- **Desarrollador:** Héctor Escobar
- **GitHub:** [TuliEscobar](https://github.com/TuliEscobar)
- **Proyecto:** AeroAssist V1

## 🚀 Guía de Instalación

### Prerrequisitos
1. Node.js instalado
2. Una cuenta en Google Cloud con API key para Gemini
3. Git instalado

### Pasos de Instalación

1. **Clonar el Repositorio**
   ```bash
   git clone https://github.com/TuliEscobar/AeroAssist_V1.git
   cd AeroAssist_V1
   ```

2. **Instalar Dependencias**
   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno**
   - Crear archivo `.env` en la raíz del proyecto
   ```env
   GOOGLE_API_KEY=tu_clave_de_api_de_google
   ```

4. **Configurar el archivo faqs.json**
   ```json
   [
     {
       "pregunta": "¿Ejemplo de pregunta sobre regulación aeronáutica?",
       "respuesta": "Respuesta detallada sobre la regulación."
     }
   ]
   ```

## 💻 Uso del Chatbot

1. **Iniciar el Chatbot**
   ```bash
   node chatbot.js
   ```

2. **Interactuar con el Chatbot**
   - Escribe tus preguntas sobre regulaciones aeronáuticas
   - Escribe 'salir' para terminar la sesión

## 🔧 Tecnologías Utilizadas
- Node.js
- Google Gemini API
- Firebase (para futuro escalamiento)
- Axios para peticiones HTTP
- Dotenv para variables de entorno

## 📁 Estructura del Proyecto
```
AeroAssist_V1/
├── chatbot.js         # Archivo principal del chatbot
├── .env              # Variables de entorno (no incluido en git)
├── faqs.json         # Base de datos de preguntas y respuestas
├── package.json      # Dependencias y configuración del proyecto
└── README.md         # Este archivo
```

## 🔒 Seguridad
- El archivo `.env` está incluido en `.gitignore`
- Nunca compartas tu API key de Google
- Mantén actualizado el archivo de preguntas frecuentes

## 🔄 Actualizaciones Futuras
- Integración con Firebase
- Interfaz web
- Base de datos expandida
- Soporte para múltiples idiomas

## 📝 Licencia
Este proyecto está bajo la Licencia ISC.

## 🤝 Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## ⚠️ Notas Importantes
1. Asegúrate de tener Node.js instalado
2. No compartas tu API key
3. Mantén actualizado el archivo de preguntas frecuentes
4. Revisa la documentación de Firebase para futuras integraciones