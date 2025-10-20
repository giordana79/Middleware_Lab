//Import dei middleware
//Configura Express per JSON e file statici
const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const timer = require("./middleware/timer");
const uppercase = require("./middleware/uppercase");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json()); // per leggere JSON dal body
app.use(express.static("public")); // per servire frontend

// Usa i middleware globali tutte le richieste passano da logger → timer
app.use(logger);
app.use(timer);

// Rotta POST /process
//Usa uppercase prima della funzione controller
//Controller:
//Prende originalMessage e transformedMessage
//Se contiene la parola "errore", genera Error e passa ad errorHandler
//Altrimenti, invia risposta JSON con messaggi e info
app.post("/process", uppercase, (req, res, next) => {
  try {
    const originalMessage = req.body.originalMessage || "";
    const transformedMessage = req.body.transformedMessage || originalMessage;

    if (originalMessage.toLowerCase().includes("errore")) {
      return next(new Error('Hai scritto una parola non consentita: "errore"'));
    }

    // Risposta JSON al client
    res.json({
      original: originalMessage,
      transformed: transformedMessage,
      info: "Elaborazione completata attraverso logger → timer → uppercase → controller",
    });
  } catch (err) {
    next(err); // passa l'errore a errorHandler
  }
});

//Middleware per errori e deve essere messo dopo tutte le rotte
app.use(errorHandler);

// Avvio server sulla porta 3000
app.listen(3000, () =>
  console.log("🚀 Server attivo su http://localhost:3000")
);
