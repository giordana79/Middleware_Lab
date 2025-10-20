//Definisce i middleware/step della pipeline frontend
const stages = [
  { id: "logger", arrow: "arrow1" },
  { id: "timer", arrow: "arrow2" },
  { id: "uppercase", arrow: "arrow3" },
  { id: "controller", arrow: "arrow4" },
  { id: "response", arrow: null },
];

const consoleDiv = document.getElementById("consoleContent");

//Logga messaggi simulando console server
//Colori diversi per errori/warning/info
function logToConsole(message, type = "info") {
  const line = document.createElement("div");
  line.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  if (type === "error") line.style.color = "red";
  else if (type === "warn") line.style.color = "orange";
  consoleDiv.appendChild(line);
  consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

//Aggiunge classe active al middleware corrente
//Evidenzia la freccia corrispondente per animazione
function highlightStage(id, arrowId) {
  const stageEl = document.getElementById(id);
  stageEl.classList.add("active");

  if (arrowId) {
    const arrowEl = document.getElementById(arrowId);
    arrowEl.classList.add("active");
    setTimeout(() => arrowEl.classList.remove("active"), 400);
  }

  setTimeout(() => stageEl.classList.remove("active"), 700);
}

document.getElementById("messageForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = document.getElementById("messageInput").value || "";
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "⏳ Elaborazione in corso...";
  logToConsole(`Messaggio inviato al server: "${message}"`);

  // Simula il flusso dei middleware con timer
  for (const stage of stages) {
    const start = performance.now();
    highlightStage(stage.id, stage.arrow);
    await new Promise((resolve) =>
      setTimeout(resolve, 400 + Math.random() * 200)
    ); // tempo casuale per simulare elaborazione
    const duration = (performance.now() - start).toFixed(1);
    logToConsole(
      `${stage.id.charAt(0).toUpperCase() + stage.id.slice(1)} eseguito in ${duration} ms`
    );
  }

  try {
    const res = await fetch("/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, originalMessage: message }),
    });

    const data = await res.json();

    if (data.error) {
      outputDiv.innerHTML = `
        ❌ <strong>Errore:</strong> ${data.message}<br>
        <small>${data.details}</small>
      `;
      logToConsole(`Errore dal server: ${data.details}`, "error");
    } else {
      outputDiv.innerHTML = `
        ✅ <strong>Messaggio originale:</strong> ${data.original}<br>
        🔠 <strong>Trasformato:</strong> ${data.transformed}<br>
        <em>${data.info}</em>
      `;
      logToConsole(`Controller finale inviato al client`);
      logToConsole(`Risposta inviata al frontend`);
    }
  } catch (err) {
    outputDiv.innerHTML = `<p style="color:red;">Errore di rete: ${err.message}</p>`;
    logToConsole(`Errore di rete: ${err.message}`, "error");
  }
});
