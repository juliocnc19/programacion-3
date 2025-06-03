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
      include: { state: true },
      orderBy: { createdAt: 'desc' }
    });
    res.render('ganadero/irons', { irons, title: 'Mis Hierros' });
  },

  // Mostrar formulario para crear hierro
  showIronForm: async (req, res) => {
    const states = await req.prisma.state.findMany();
    res.render('ganadero/iron_form', { title: 'Nuevo Hierro', error: null, states });
  },

  // Crear hierro (con imagen)
  createIron: async (req, res) => {
    try {
      const { description, stateId } = req.body;
      let symbolImageUrl = '';

      const states = await req.prisma.state.findMany();

      if (req.file) {
        symbolImageUrl = '/uploads/' + req.file.filename;
      } else {
        return res.render('ganadero/iron_form', { title: 'Nuevo Hierro', error: 'Debe subir una imagen.', states });
      }

      if (!stateId) {
        return res.render('ganadero/iron_form', { title: 'Nuevo Hierro', error: 'Debe seleccionar un estado.', states });
      }

      await req.prisma.iron.create({
        data: {
          symbolImageUrl,
          description,
          userId: req.session.user.id,
          stateId: Number(stateId)
        }
      });
      res.redirect('/ganadero/hierros');
    } catch (error) {
      console.error('Error al crear hierro:', error);
      const states = await req.prisma.state.findMany();
      res.render('ganadero/iron_form', { title: 'Nuevo Hierro', error: 'Error al crear el hierro.', states });
    }
  }
};

module.exports = ganaderoController;
