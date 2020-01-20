## Deploy entire Mern app to Heroku
*How to Scaffold a Boilerplate MERN Application and Deploy to Heroku*
- [note](#note)
- [reference](#reference)
- [esempio](#esempio)
- [fare il push su Github](#fare-il-push-su-github)
- [installare Express](#installare-express)
- [modificare il file package.json](#modificare-il-file-package.json)
- [deploy su Heroku](#deploy-to-heroku)
- [MongoDB](#mongodb)
- [installare Mongoose](#installare-mongoose)
- [creare uno Schema base](#creare-uno-schema-base)
- [creare una Route api base](#creare-una-route-api-base)
- [installare React](#installare-react)
- [settare il proxy](#settare-il-proxy)
- [connettere frontend con backend](#connettere-frontend-con-backend)
- [altre modifiche al file server.js](#altre-modifiche-al-file-server.js)
- [fare la postbuild di react](#fare-la-postbuild-di-react)
- [deploy completo](#deploy-completo)
---
### note
*Come pubblicare una applicazione MERN su heroku dove fornted e backend vengono distribuiti entrambi su heroku*

---
### reference
[jarednielsen: mern-deploy-heroku/](https://jarednielsen.com/mern-deploy-heroku/)
[github: mern](https://github.com/nielsenjared/mern)

---
### esempio
[https://boiling-escarpment-21831.herokuapp.com/](https://boiling-escarpment-21831.herokuapp.com/)
```
mkdir mern
cd mern
npm init
```
E' necessario aggiungere un repository GitHub.
Aggiungere il link repo a package.json quando richiesto.

---
### fare il push su Github
```
git init
git remote add origin <URL-to-your-repo>
```
creare il file  `root/.gitignore` e scriverci dentro `node_modules`

---
### installare Express
`npm install express --save`
Creare il file `root/server.js` e aggiungerci il codice:
```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
```
---
### modificare il file package.json
```js
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "node server.js"
  },
```
Startare il server, dal terminale digitare:
`npm start`
Nel browser digitare `localhost:3001` per verificare che funziona.

---
### deploy su Heroku
Fare il deploy periodicamente per testarlo
Accedere a Heroku da terminale e creare una nuova app:
```
heroku login
heroku create
```
Verifica la creazione della tua app Heroku eseguendo  `git remote -v`.

Eseguire i seguenti comandi per pushare l'app su heroku:
```
git add .
git commit -m “First”
git push -u origin master
git push heroku master
```

Andare sulla dashboard personale di heroku: [https://dashboard.heroku.com/apps](https://dashboard.heroku.com/apps)
Cliccare sulla app appena creata e cliccare su 'Open App'.

Esempio di app creata fin qui:
https://boiling-escarpment-21831.herokuapp.com/

Quando si vuole aggiornare l'app:
```
git add .
git commit -m “Ch-ch-ch-changes…”
git push heroku master
```
---
### MongoDB
Su Heroku.com e trovare l' app. 
In `Resources`, cercare `mLab` nel campo di input dei componenti aggiuntivi e aggiungerlo come `Provision`. 
Se non ci sono risultati, devi aggiungere una carta di credito al tuo account. 

In `Settings`, 
cliccare su `Reveal Config Var` per vedere la variabile d'ambiente `MONGODB_URI` aggiunta dal componente appena installato di MongoDB.

---
### installare Mongoose
Installallare mongoose: `npm install --save mongoose`
Modificare il file `root/server.js`:
```js
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/mern",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
);

app.get('/', (req, res) => {
  res.send("Ciao Mondo");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
```
---
### creare uno Schema base
Creare cartella e file: `root/models/index.js` e aggiungere il codice:
```js
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  date: Date
});
```
---
### creare una Route api base
*Da completare*
Creare cartella e file: `root/routes/index.js` e aggiungere il codice:
```js

```
---
### installare React
Sempre dalla directory principale `root`
installare react: 
`npm install -g create-react-app`
`create-react-app client`

---
### settare il proxy
Connettere il fronte al retro usando un proxy:
in `root/client/package.json` sotto la prop `"private"` aggiungere
`"proxy": "http://localhost:3001/"`, es:
```json
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://localhost:3001/",
  "dependencies": {
```
---
### connettere frontend con backend
Installare concurrently: `npm install --save concurrently`
Connettere il fronte al retro usando concurrently:
`npm install --save concurrently`
A `root/package.json` aggiungere due nuovi script:
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "client": "npm run start --prefix client",
    "dev": "concurrently \"npm run start\" \"npm run client\""
  },
```
---
### altre modifiche al file server.js
installare `npm install --save path`
Modificare il file `root/server.js`:
```js
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/mern",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const PORT = process.env.PORT || 3001;
app.listen(PORT);
```
---
### fare la postbuild di react
per fare la build di react dopo il deploy su heroku
modificare il file `root/package.json`:
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "client": "npm run start --prefix client",
    "dev": "concurrently \"npm run start\" \"npm run client\"",
"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
  },
```
### deploy completo
```
git add .
git commit -m "deploy completo"
git push heroku master
```

