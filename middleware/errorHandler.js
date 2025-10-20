function errorHandler(err, req, res, next) {
  console.error(`[ErrorHandler] Errore catturato: ${err.message}`);
  res.status(500).json({
    error: true,
    message:
      "Si è verificato un errore durante l’elaborazione della richiesta.",
    details: err.message,
  });
}

module.exports = errorHandler;

//module.exports esporta la funzione come middleware.
//err è l’oggetto errore passato da next(err).
//Logga l’errore su console.
//Invia una risposta JSON al client con status 500.
//Mostra message generico e details con il messaggio dell’errore.
