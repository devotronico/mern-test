const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("Ciao Mondo");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);