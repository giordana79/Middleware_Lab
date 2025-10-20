// Server Express completo con pipeline di middleware

const express = require("express"); // Importa Express
const app = express(); // Crea un'istanza di Express

// Import dei middleware
const logger = require("./middleware/logger");
const timer = require("./middleware/timer");
const uppercase = require("./middleware/uppercase");
const errorHandler = require("./middleware/errorHandler");

// Middleware per leggere JSON nel body
app.use(express.json());

// Middleware per servire file statici (frontend)
app.use(express.static("public"));

// Middleware globali (tutte le richieste passeranno da questi)
app.use(logger); // Logger
app.use(timer); // Timer

// Rotta POST per processare i messaggi
app.post("/process", uppercase, (req, res, next) => {
  try {
    const originalMessage = req.body.originalMessage || ""; // Messaggio originale
    const transformedMessage = req.body.transformedMessage || originalMessage; // Messaggio maiuscolo

    // Controllo "parola vietata"
    if (originalMessage.toLowerCase().includes("errore")) {
      return next(new Error('Hai scritto una parola non consentita: "errore"'));
    }

    // Risposta JSON
    res.json({
      original: originalMessage, // Messaggio originale
      transformed: transformedMessage, // Messaggio trasformato
      info: "Elaborazione completata attraverso logger → timer → uppercase → controller", // Info
    });
  } catch (err) {
    next(err); // Passa l'errore a errorHandler
  }
});

// Middleware per gestire errori (deve essere dopo tutte le rotte)
app.use(errorHandler);

// Avvio del server sulla porta 3000
app.listen(3000, () =>
  console.log("🚀 Server attivo su http://localhost:3000")
);
