// Middleware che trasforma il messaggio ricevuto in maiuscolo

function uppercase(req, res, next) {
  if (req.body && typeof req.body.message === "string") {
    // Se esiste req.body.message ed è una stringa
    req.body.transformedMessage = req.body.message.toUpperCase(); // Trasforma in maiuscolo
    console.log(`[Uppercase] Messaggio trasformato in maiuscolo`);
  } else {
    // Se non esiste o non è stringa
    req.body.transformedMessage = ""; // Imposta stringa vuota
  }
  next(); // Passa al middleware successivo
}

module.exports = uppercase; // Esporta il middleware
