const adminController = {
  // Dashboard
  dashboard: (req, res) => {
    res.render('admin/dashboard', { title: 'Panel de Administrador' });
  },

  // Usuarios
  listUsers: async (req, res) => {
    const users = await req.prisma.user.findMany({ include: { role: true } });
    res.render('admin/users', { users, title: 'Administrar Usuarios' });
  },
  showUserForm: async (req, res) => {
    const roles = await req.prisma.role.findMany();
    let user = null;
    if (req.params.id) user = await req.prisma.user.findUnique({ where: { id: Number(req.params.id) } });
    res.render('admin/user_form', { user, roles, title: user ? 'Editar Usuario' : 'Nuevo Usuario' });
  },
  createUser: async (req, res) => {
    const { username, email, password, ci, roleId } = req.body;
    await req.prisma.user.create({
      data: { username, email, password, ci: Number(ci), roleId: Number(roleId) }
    });
    res.redirect('/admin/users');
  },
  updateUser: async (req, res) => {
    const { username, email, ci, roleId } = req.body;
    await req.prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { username, email, ci: Number(ci), roleId: Number(roleId) }
    });
    res.redirect('/admin/users');
  },
  deleteUser: async (req, res) => {
    await req.prisma.user.delete({ where: { id: Number(req.params.id) } });
    res.redirect('/admin/users');
  },

  // Roles
  listRoles: async (req, res) => {
    const roles = await req.prisma.role.findMany();
    res.render('admin/roles', { roles, title: 'Administrar Roles' });
  },
  showRoleForm: async (req, res) => {
    let role = null;
    if (req.params.id) role = await req.prisma.role.findUnique({ where: { id: Number(req.params.id) } });
    res.render('admin/role_form', { role, title: role ? 'Editar Rol' : 'Nuevo Rol' });
  },
  createRole: async (req, res) => {
    const { name } = req.body;
    await req.prisma.role.create({ data: { name } });
    res.redirect('/admin/roles');
  },
  updateRole: async (req, res) => {
    const { name } = req.body;
    await req.prisma.role.update({ where: { id: Number(req.params.id) }, data: { name } });
    res.redirect('/admin/roles');
  },
  deleteRole: async (req, res) => {
    await req.prisma.role.delete({ where: { id: Number(req.params.id) } });
    res.redirect('/admin/roles');
  },

  // Estados
  listStates: async (req, res) => {
    const states = await req.prisma.state.findMany();
    res.render('admin/states', { states, title: 'Administrar Estados' });
  },
  showStateForm: async (req, res) => {
    let state = null;
    if (req.params.id) state = await req.prisma.state.findUnique({ where: { id: Number(req.params.id) } });
    res.render('admin/state_form', { state, title: state ? 'Editar Estado' : 'Nuevo Estado' });
  },
  createState: async (req, res) => {
    const { name } = req.body;
    await req.prisma.state.create({ data: { name } });
    res.redirect('/admin/states');
  },
  updateState: async (req, res) => {
    const { name } = req.body;
    await req.prisma.state.update({ where: { id: Number(req.params.id) }, data: { name } });
    res.redirect('/admin/states');
  },
  deleteState: async (req, res) => {
    await req.prisma.state.delete({ where: { id: Number(req.params.id) } });
    res.redirect('/admin/states');
  },

  // Hierros
  listIrons: async (req, res) => {
    const irons = await req.prisma.iron.findMany({ include: { user: true, state: true } });
    res.render('admin/irons', { irons, title: 'Administrar Hierros' });
  },
  showIronForm: async (req, res) => {
    const users = await req.prisma.user.findMany();
    const states = await req.prisma.state.findMany();
    let iron = null;
    if (req.params.id) iron = await req.prisma.iron.findUnique({ where: { id: Number(req.params.id) } });
    res.render('admin/iron_form', { iron, users, states, title: iron ? 'Editar Hierro' : 'Nuevo Hierro' });
  },
  createIron: async (req, res) => {
    const { symbolImageUrl, description, userId, stateId } = req.body;
    await req.prisma.iron.create({
      data: { symbolImageUrl, description, userId: Number(userId), stateId: Number(stateId) }
    });
    res.redirect('/admin/irons');
  },
  updateIron: async (req, res) => {
    const { symbolImageUrl, description, userId, stateId } = req.body;
    await req.prisma.iron.update({
      where: { id: Number(req.params.id) },
      data: { symbolImageUrl, description, userId: Number(userId), stateId: Number(stateId) }
    });
    res.redirect('/admin/irons');
  },
  deleteIron: async (req, res) => {
    await req.prisma.iron.delete({ where: { id: Number(req.params.id) } });
    res.redirect('/admin/irons');
  }
};

module.exports = adminController;
