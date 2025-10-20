// Registra metodo e URL di ogni richiesta
function logger(req, res, next) {
  const now = new Date().toISOString(); // Ottieni data e ora corrente in formato ISO
  console.log(`[Logger] ${now} - ${req.method} ${req.originalUrl}`); // Logga il metodo e percorso
  next(); // Passa al middleware successivo
}

module.exports = logger; // Esporta il middleware
