const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const db = require('./dbconfig.js');
const authRoute=require('./routes/authRoutes.js')
const cargoRoute=require('./routes/cargoRoutes.js')
const documentRoute=require('./routes/documentRoutes.js')
const usuarioRoute=require('./routes/usuarioRoutes.js')

const app = express();

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello!' });
});
app.use("/api/auth",authRoute);
app.use("/api/role",cargoRoute);
app.use("/api/document",documentRoute);
app.use("/api/user",usuarioRoute);

//archivos obtener
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// Manejar el evento beforeExit para cerrar la conexión a la base de datos
process.on('beforeExit', () => {
  db.end();
});

const port = process.env.API_PORT;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
