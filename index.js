const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const categoryRoutes = require('./routes/categoryRoutes');
const dishRoutes = require('./routes/dishRoutes');
const db = require('./config/firebase');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/categories', categoryRoutes);
app.use('/categories/:categoryId/dishes', dishRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
