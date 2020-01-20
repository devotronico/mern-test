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