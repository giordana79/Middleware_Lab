// Registra metodo e URL di ogni richiesta
function logger(req, res, next) {
  const now = new Date().toISOString();
  console.log(`[Logger] ${now} - ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = logger;

//Middleware globale per loggare tutte le richieste
//req.method = GET/POST ecc
//req.originalUrl = percorso della richiesta
//Chiama next() per passare al middleware successivo
