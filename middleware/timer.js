// Misura il tempo di elaborazione della richiesta
function timer(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[Timer] Tempo di risposta: ${duration} ms`);
  });
  next();
}

module.exports = timer;

//Registra il tempo impiegato per rispondere al client.
//res.on("finish") viene chiamato quando la risposta è completata.
//Logga duration in ms.
//Passa al middleware successivo con next().
