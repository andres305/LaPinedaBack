const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

// Firebase DB
const db = require('./config/firebase');

// Middleware
const verifyToken = require('./middleware/authMiddleware');

// Rutas
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const dishRoutes = require('./routes/dishRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Añadir acceso a Firestore en todas las rutas
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Rutas públicas
app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/categories/:categoryId/dishes', dishRoutes);

// Rutas protegidas por token (solo admin)
app.use('/admin', verifyToken, adminRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
