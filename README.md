# 🧙 Chat con Geralt de Rivia (SPA + Gemini AI)

Proyecto integrador del Módulo 3: Single Page Application que permite chatear con un personaje ficticio utilizando inteligencia artificial (Google Gemini), desplegada en Vercel.

---

## 🌐 Demo en vivo

👉 https://proyecto-m3-andres-burgos.vercel.app

---

## 📌 Descripción

Esta aplicación permite mantener una conversación en tiempo real con **Geralt de Rivia**, personaje de la saga *The Witcher*, utilizando la API de Google Gemini.

La aplicación está construida como una **SPA (Single Page Application)** sin frameworks, utilizando routing manual con History API y una Serverless Function para proteger la API key.

---

## 🧙 Personaje

**Geralt de Rivia**

- Cazador de monstruos (witcher)
- Personalidad seria y directa
- Respuestas cortas y precisas
- Tono neutral con leves matices sarcásticos

---

## 🧱 Tecnologías utilizadas

- HTML5
- CSS3 (responsive mobile-first)
- JavaScript (Vanilla)
- SPA con History API
- Fetch API
- Vercel Serverless Functions
- Google Gemini API
- Vitest (testing)

---

## 📁 Estructura del proyecto


/api
functions.js

/src
index.html
app.js
styles.css
utils.js

/tests
app.test.js
utils.test.js

.env.example
.env (ignorado)
vercel.json
package.json
README.md


---

## ⚙️ Instalación y ejecución local

### 1. Clonar repositorio

```bash
git clone <repo-url>
cd ProyectoM3_AndresBurgos
2. Instalar dependencias
npm install
3. Configurar variables de entorno

Crear archivo .env:

GEMINI_API_KEY=tu_api_key
4. Ejecutar en desarrollo
vercel dev
🧪 Tests
npm test
Casos cubiertos:
Formateo de mensajes
Obtención del último mensaje
Funciones utilitarias del chat
🔐 Seguridad
La API Key NO está expuesta en el frontend
Uso de Vercel Serverless Function como proxy seguro
Variables de entorno configuradas en Vercel
🧭 Routing (SPA)

Rutas disponibles:

/home
/chat
/about

Implementado con History API y soporte para navegación sin recarga.

✨ Funcionalidades
Chat en tiempo real con IA
Contexto de conversación persistente
Indicador de “escribiendo…”
Scroll automático
Manejo de errores de API
UI responsive mobile-first
Copiar mensajes al portapapeles
Borrar historial del chat
Modo claro / oscuro
🚀 Deploy

Deploy automático en Vercel conectado a GitHub.

Cada push a main actualiza la aplicación en producción.

👨‍💻 Autor

Andrés Burgos
Proyecto desarrollado como parte del Proyecto Integrador M3