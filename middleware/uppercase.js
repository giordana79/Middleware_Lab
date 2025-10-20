// Trasforma il testo ricevuto in maiuscolo prima della risposta
function uppercase(req, res, next) {
  if (req.body && typeof req.body.message === "string") {
    req.body.transformedMessage = req.body.message.toUpperCase();
    console.log(`[Uppercase] Messaggio trasformato in maiuscolo`);
  } else {
    req.body.transformedMessage = "";
  }
  next();
}

module.exports = uppercase;

//Controlla se req.body.message è una stringa.
//Se sì, crea req.body.transformedMessage in MAIUSCOLO.
//Se no, inizializza transformedMessage a "".
//Chiama next() per continuare il flusso.
