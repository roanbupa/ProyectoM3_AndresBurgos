import { messages } from "./chat.js";

const app = document.querySelector("#app");

function navigate(url) {

  history.pushState({}, "", url); // cambia url

  router(); // renderiza vista
}

document.addEventListener("click", (e) => {

  if (e.target.matches("[data-link]")) {

    e.preventDefault();

    navigate(e.target.href);
  }
});

window.addEventListener("popstate", router); // back y forward

async function router() {

  const path = location.pathname;

  if (path === "/" || path === "/home") {

    app.innerHTML = `
      <section>
        <h2>Bienvenido</h2>

        <p>Habla con Geralt de Rivia.</p>

        <button id="go-chat">Comenzar</button>
      </section>
    `;

    document.querySelector("#go-chat")
      ?.addEventListener("click", () => navigate("/chat"));

  } else if (path === "/chat") {

    renderChat();

  } else if (path === "/about") {

    app.innerHTML = `
      <section>
        <h2>About</h2>

        <p>Proyecto Integrador M3.</p>

        <p>Personaje: Geralt de Rivia.</p>
      </section>
    `;
  }
}

function renderChat() {

  app.innerHTML = `
  
    <section class="chat-container">

      <div id="messages"></div>

      <div class="input-area">

        <input
          id="message-input"
          placeholder="Escribe..."
        >

        <button id="send-btn">
          Enviar
        </button>

      </div>

      <p id="typing"></p>

    </section>
  `;

  renderMessages();

  document
    .querySelector("#send-btn")
    .addEventListener("click", sendMessage);

  document
    .querySelector("#message-input")
    .addEventListener("keypress", (e) => {

      if (e.key === "Enter") {

        sendMessage();
      }
    });
}

async function sendMessage() {

  const input = document.querySelector("#message-input");

  const text = input.value.trim();

  if (!text) return;

  messages.push({
    role: "user",
    text,
    timestamp: new Date().toLocaleTimeString()
  });

  renderMessages();

  input.value = "";

  document.querySelector("#typing").textContent =
    "Geralt está escribiendo...";

  try {

    const response = await fetch("/api/functions", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        messages
      })
    });

    const data = await response.json();

    messages.push({
      role: "assistant",
      text: data.reply,
      timestamp: new Date().toLocaleTimeString()
    });

    renderMessages();

  } catch {

    messages.push({
      role: "assistant",
      text: "No puedo responder ahora.",
      timestamp: new Date().toLocaleTimeString()
    });

    renderMessages();

  } finally {

    document.querySelector("#typing").textContent = "";
  }
}

function renderMessages() {

  const container =
    document.querySelector("#messages");

  if (!container) return;

  container.innerHTML = messages
    .map(msg => `
      <div class="${msg.role}">

        <p>${msg.text}</p>

        <small>${msg.timestamp}</small>

      </div>
    `)
    .join("");

  container.scrollTop =
    container.scrollHeight; // auto scroll
}

router();