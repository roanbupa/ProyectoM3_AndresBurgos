const app = document.querySelector("#app");

// estado global del chat
const messages = [];

// tema
function initThemeToggle() {
  const themeButton = document.getElementById("theme-toggle");

  if (!themeButton) return;

  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light");

    themeButton.textContent =
      document.body.classList.contains("light") ? "🌙" : "☀️";
  });
}

// navegar sin recargar página
function navigate(url) {
  history.pushState({}, "", url);
  router();
}

// click en links SPA
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");

  if (link) {
    e.preventDefault();
    navigate(link.getAttribute("href"));
  }
});

// back / forward navegador
window.addEventListener("popstate", router);

// router principal
function router() {
  const path = location.pathname;

  app.innerHTML = "";

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

    initThemeToggle();
    return;
  }

  if (path === "/chat") {
    renderChat();
    initThemeToggle();
    return;
  }

  if (path === "/about") {
    app.innerHTML = `
      <section class="about">
        <h2>About</h2>

        <img
          src="/images/geralt.jpg"
          alt="Geralt de Rivia"
          class="about-image"
        >

        <p><strong>Proyecto Integrador M3</strong></p>

        <p>
          Esta aplicación permite conversar con Geralt de Rivia mediante
          Google Gemini AI utilizando una arquitectura segura con Vercel
          Serverless Functions.
        </p>

        <p><strong>Personaje:</strong> Geralt de Rivia.</p>
      </section>
    `;

    initThemeToggle();
    return;
  }

  app.innerHTML = `
    <section>
      <h2>404</h2>
      <p>Página no encontrada</p>
    </section>
  `;

  initThemeToggle();
}

// render chat UI
function renderChat() {
  app.innerHTML = `
    <section class="chat-container">

      <div id="messages"></div>

      <div class="input-area">
        <input id="message-input" placeholder="Escribe..." />
        <button id="send-btn">Enviar</button>
        <button id="clear-chat">🗑️</button>
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

  document.querySelector("#clear-chat")
    ?.addEventListener("click", clearChat);
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

// limpiar chat
function clearChat() {
  messages.length = 0;

  const container = document.querySelector("#messages");
  if (container) container.innerHTML = "";

  const input = document.querySelector("#message-input");
  if (input) input.value = "";

  document.querySelector("#typing").textContent = "";
}

// render mensajes
function renderMessages() {
  const container = document.querySelector("#messages");

  if (!container) return;

  container.innerHTML = messages
    .map((msg, index) => `
      <div class="${msg.role}">
        <p>${msg.text}</p>
        <small>${msg.timestamp}</small>

        ${
          msg.role === "assistant"
            ? `<button class="copy-btn" data-index="${index}">📋 Copiar</button>`
            : ""
        }
      </div>
    `)
    .join("");

  container.scrollTop = container.scrollHeight;

  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const index = btn.dataset.index;

      await navigator.clipboard.writeText(messages[index].text);

      btn.textContent = "✅ Copiado";

      setTimeout(() => {
        btn.textContent = "📋 Copiar";
      }, 1500);
    });
  });
}

// inicializar SPA
document.addEventListener("DOMContentLoaded", router);