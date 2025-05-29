const bcrypt = require('bcryptjs');

const authController = {
  // Mostrar formulario de login
  showLogin: (req, res) => {
    res.render('auth/login', { 
      title: 'Iniciar Sesión',
      error: null 
    });
  },

  // Procesar login
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Buscar usuario
      const user = await req.prisma.user.findUnique({
        where: { username },
        include: { role: true }
      });

      if (!user) {
        return res.render('auth/login', {
          title: 'Iniciar Sesión',
          error: 'Usuario o contraseña incorrectos'
        });
      }

      // Verificar contraseña
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.render('auth/login', {
          title: 'Iniciar Sesión',
          error: 'Usuario o contraseña incorrectos'
        });
      }

      // Guardar usuario en sesión
      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };

      // Redirigir según rol
      if (user.role.name === 'admin') {
        res.redirect('/admin/dashboard');
      } else {
        res.redirect('/ganadero/dashboard');
      }

    } catch (error) {
      console.error('Error en login:', error);
      res.render('auth/login', {
        title: 'Iniciar Sesión',
        error: 'Error al iniciar sesión'
      });
    }
  },

  // Mostrar formulario de registro
  showRegister: (req, res) => {
    res.render('auth/register', {
      title: 'Registro de Ganadero',
      error: null
    });
  },

  // Procesar registro
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Verificar si el usuario ya existe
      const existingUser = await req.prisma.user.findFirst({
        where: {
          OR: [
            { username },
            { email }
          ]
        }
      });

      if (existingUser) {
        return res.render('auth/register', {
          title: 'Registro de Ganadero',
          error: 'El usuario o email ya está registrado'
        });
      }

      // Obtener el rol de ganadero
      const ganaderoRole = await req.prisma.role.findUnique({
        where: { name: 'ganadero' }
      });

      if (!ganaderoRole) {
        throw new Error('Rol de ganadero no encontrado');
      }

      // Encriptar contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear usuario
      const newUser = await req.prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          roleId: ganaderoRole.id
        }
      });

      // Iniciar sesión automáticamente
      req.session.user = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: { name: 'ganadero' }
      };

      res.redirect('/ganadero/dashboard');

    } catch (error) {
      console.error('Error en registro:', error);
      res.render('auth/register', {
        title: 'Registro de Ganadero',
        error: 'Error al registrar usuario'
      });
    }
  },

  // Cerrar sesión
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al cerrar sesión:', err);
      }
      res.redirect('/auth/login');
    });
  }
};

module.exports = authController; 