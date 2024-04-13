// Importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Configurar Express
const app = express();
const PORT = 3000;

// Conectar a la base de datos MongoDB (asegúrate de tener MongoDB instalado y ejecutándose)
mongoose.connect('mongodb://localhost:27017/heladeria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Modelo del usuario
const User = mongoose.model('User', userSchema);

// Middleware para analizar solicitudes JSON
app.use(express.json());

// Rutas de la API
// Registro de usuario
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'El nombre de usuario ya está en uso.' });
    }

    // Crear un nuevo usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Usuario creado con éxito.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario.' });
  }
});

// Inicio de sesión de usuario
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar el usuario en la base de datos
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado.' });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta.' });
    }

    res.json({ message: 'Inicio de sesión exitoso.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión.' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
