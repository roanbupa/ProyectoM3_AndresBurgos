const app = document.querySelector("#app");

// estado global del chat
const messages = []; // guarda conversación

// navegar sin recargar página
function navigate(url) {
  history.pushState({}, "", url); // cambia URL
  router(); // renderiza vista
}

// click en links SPA
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");

  if (link) {
    e.preventDefault();
    navigate(link.getAttribute("href")); // navegación segura
  }
});

// back / forward navegador
window.addEventListener("popstate", router);

// router principal
function router() {
  const path = location.pathname;

  app.innerHTML = ""; // limpia vista antes de renderizar

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

    return;
  }

  if (path === "/chat") {
    renderChat();
    return;
  }

  if (path === "/about") {
    app.innerHTML = `
      <section>
        <h2>About</h2>
        <p>Proyecto Integrador M3.</p>
        <p>Personaje: Geralt de Rivia.</p>
      </section>
    `;
    return;
  }

  // fallback (404 SPA)
  app.innerHTML = `
    <section>
      <h2>404</h2>
      <p>Página no encontrada</p>
    </section>
  `;
}

// render chat UI
function renderChat() {
  app.innerHTML = `
    <section class="chat-container">

      <div id="messages"></div>

      <div class="input-area">
        <input id="message-input" placeholder="Escribe..." />
        <button id="send-btn">Enviar</button>
      </div>

      <p id="typing"></p>

    </section>
  `;

  renderMessages();

  document.querySelector("#send-btn")
    ?.addEventListener("click", sendMessage);

  document.querySelector("#message-input")
    ?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });
}

// enviar mensaje
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages })
    });

    const data = await response.json();

    messages.push({
      role: "assistant",
      text: data.reply,
      timestamp: new Date().toLocaleTimeString()
    });

  } catch {
    messages.push({
      role: "assistant",
      text: "No puedo responder ahora.",
      timestamp: new Date().toLocaleTimeString()
    });
  }

  renderMessages();
  document.querySelector("#typing").textContent = "";
}

// render mensajes
function renderMessages() {
  const container = document.querySelector("#messages");

  if (!container) return;

  container.innerHTML = messages
    .map(msg => `
      <div class="${msg.role}">
        <p>${msg.text}</p>
        <small>${msg.timestamp}</small>
      </div>
    `)
    .join("");

  container.scrollTop = container.scrollHeight;
}

// inicializar SPA (IMPORTANTE)
document.addEventListener("DOMContentLoaded", router);