Si utilizza Node.js + Express, con 4 middleware (logger, timer, uppercase, errorHandler) e un piccolo frontend HTML+JS+style per testare il flusso.

- npm init -y

Crea un nuovo progetto Node.js, cioè inizializza il file fondamentale:
package.json
Questo file contiene tutte le informazioni del progetto:

- nome, versione, descrizione
- script (es. start, test)
- dipendenze (express, mongoose, ecc.)
- autore, licenza, ecc.

- npm install express mongoose
  (non era necessario istallare mongoose)

  Per avviare il server:
  - node server.js

  Poi aprire http://localhost:3000 nel browser.

**Punti chiave del corretto flusso**

1. Logger: stampa data, metodo e route
2. Uppercase: trasforma il messaggio in maiuscolo (salvando la versione in transformedMessage)
3. Timer: misura il tempo di risposta (mostrato nel terminale)
4. Controller: decide se tutto è OK o se deve generare un errore
5. ErrorHandler: intercetta l’errore e invia un JSON coerente al frontend

**Flusso di funzionamento**

1. L’utente invia un messaggio tramite il form

2. Frontend:

- - Evidenzia i middleware simulando la pipeline
- - Logga i tempi di ogni step

3. Backend:

- - Richiesta passa attraverso logger → timer → uppercase → controller
- - Controller elabora il messaggio
- - Se tutto ok → risposta JSON con testo originale e trasformato
- - Se errore → errorHandler invia JSON con dettagli

4. Frontend riceve risposta e aggiorna:

- #output con risultato
- #serverConsole con log dettagliato
