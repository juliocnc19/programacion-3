const path = require('path');

const ganaderoController = {
  // Panel principal
  dashboard: (req, res) => {
    res.render('ganadero/dashboard', { title: 'Panel Ganadero' });
  },

  // Listar hierros del usuario autenticado
  listIrons: async (req, res) => {
    const irons = await req.prisma.iron.findMany({
      where: { userId: req.session.user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.render('ganadero/irons', { irons, title: 'Mis Hierros' });
  },

  // Mostrar formulario para crear hierro
  showIronForm: (req, res) => {
    res.render('ganadero/iron_form', { title: 'Nuevo Hierro', error: null });
  },

  // Crear hierro (con imagen)
  createIron: async (req, res) => {
    try {
      const { description } = req.body;
      let symbolImageUrl = '';

      if (req.file) {
        symbolImageUrl = '/uploads/' + req.file.filename;
      } else {
        return res.render('ganadero/iron_form', { title: 'Nuevo Hierro', error: 'Debe subir una imagen.' });
      }

      await req.prisma.iron.create({
        data: {
          symbolImageUrl,
          description,
          userId: req.session.user.id
        }
      });
      res.redirect('/ganadero/hierros');
    } catch (error) {
      console.error('Error al crear hierro:', error);
      res.render('ganadero/iron_form', { title: 'Nuevo Hierro', error: 'Error al crear el hierro.' });
    }
  }
};

module.exports = ganaderoController;
