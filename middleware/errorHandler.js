// Middleware per gestire tutti gli errori

function errorHandler(err, req, res, next) {
  console.error(`[ErrorHandler] Errore catturato: ${err.message}`); // Log dell'errore
  res.status(500).json({
    error: true, // Flag di errore
    message:
      "Si è verificato un errore durante l’elaborazione della richiesta.", // Messaggio generico
    details: err.message, // Messaggio specifico dell'errore
  });
}

module.exports = errorHandler; // Esporta il middleware
