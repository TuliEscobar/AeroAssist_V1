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

## 🔥 Despliegue en Firebase

### Prerrequisitos para Firebase
1. Tener una cuenta de Google
2. Tener instalado Firebase CLI
   ```bash
   npm install -g firebase-tools
   ```

### Pasos para el Despliegue

1. **Iniciar Sesión en Firebase**
   ```bash
   firebase login
   ```

2. **Inicializar el Proyecto de Firebase**
   ```bash
   firebase init
   ```
   - Seleccionar las siguientes opciones:
     - Hosting
     - Functions (si se utilizan funciones serverless)
     - Firestore (si se utiliza la base de datos)
   - Elegir el proyecto existente o crear uno nuevo
   - Configurar las opciones según las indicaciones

3. **Configurar Firebase en el Proyecto**
   ```bash
   npm install firebase
   ```
   - Actualizar el archivo `.env` con las credenciales de Firebase:
   ```env
   FIREBASE_API_KEY=tu_api_key_de_firebase
   FIREBASE_AUTH_DOMAIN=tu_auth_domain
   FIREBASE_PROJECT_ID=tu_project_id
   FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
   FIREBASE_APP_ID=tu_app_id
   ```

4. **Construir el Proyecto**
   ```bash
   npm run build
   ```

5. **Desplegar a Firebase**
   ```bash
   firebase deploy
   ```

### Verificación del Despliegue
- Una vez completado el despliegue, Firebase proporcionará una URL donde la aplicación está disponible
- Visitar la URL proporcionada para verificar el despliegue exitoso
- Acceder a la consola de Firebase para monitorear el proyecto: https://console.firebase.google.com

### Comandos Útiles de Firebase
- `firebase serve` - Probar el proyecto localmente
- `firebase deploy --only hosting` - Desplegar solo el hosting
- `firebase deploy --only functions` - Desplegar solo las funciones
- `firebase deploy --only firestore:rules` - Desplegar solo las reglas de Firestore

## ℹ️ Estado Actual del Proyecto

Por el momento, el chatbot solo está funcional en la versión local (`chatbot.js`). La integración con Firebase está en desarrollo y aún no está operativa. Para usar el chatbot:

1. **Versión Local (Funcional)**:
   ```bash
   node chatbot.js
   ```
   Esta versión incluye todas las funcionalidades del asistente virtual.

2. **Versión Firebase (En Desarrollo)**:
   - La integración con Firebase está en proceso
   - Las funcionalidades del chatbot en la versión web aún no están disponibles
   - Se actualizará cuando la integración esté completa