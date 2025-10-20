// Middleware che misura il tempo di esecuzione della richiesta

function timer(req, res, next) {
  const start = Date.now(); // Salva l'orario di inizio
  res.on("finish", () => {
    // Quando la risposta viene completata
    const duration = Date.now() - start; // Calcola durata in ms
    console.log(`[Timer] Tempo di risposta: ${duration} ms`); // Logga durata
  });
  next(); // Passa al middleware successivo
}

module.exports = timer; // Esporta il middleware
