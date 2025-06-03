const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Crear roles
    console.log('Creando roles...');
    const adminRole = await prisma.role.upsert({
      where: { name: 'admin' },
      update: {},
      create: {
        name: 'admin',
      },
    });

    const ganaderoRole = await prisma.role.upsert({
      where: { name: 'ganadero' },
      update: {},
      create: {
        name: 'ganadero',
      },
    });

    console.log('Roles creados:', { adminRole, ganaderoRole });

    // Crear usuario administrador
    console.log('Creando usuario administrador...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@sistema.com' },
      update: {},
      create: {
        username: 'admin',
        email: 'admin@sistema.com',
        password: hashedPassword,
        roleId: adminRole.id,
        ci: 0,
      },
    });

    console.log('Usuario administrador creado:', adminUser);
    console.log('Credenciales de acceso:');
    console.log('Usuario: admin');
    console.log('Contraseña: admin123');

    // Crear estados
    console.log('Creando estados...');
    const estados = [
      'Estado Anzoátegui',
      'Estado Apure',
      'Estado Aragua',
      'Estado Barinas',
      'Estado Bolívar',
      'Estado Carabobo',
      'Estado Cojedes',
      'Estado Falcón',
      'Estado Guárico',
      'Estado Lara',
      'Estado Mérida',
      'Estado Miranda',
      'Estado Monagas',
      'Estado Nueva Esparta',
      'Estado Portuguesa',
      'Estado Sucre',
      'Estado Táchira',
      'Estado Trujillo',
      'Estado Yaracuy',
      'Estado Zulia',
      'Distrito Federal',
      'Territorio Federal Amazonas',
      'Territorio Federal Delta Amacuro',
    ];
    for (const nombre of estados) {
      await prisma.state.upsert({
        where: { name: nombre },
        update: {},
        create: { name: nombre },
      });
    }
    console.log('Estados creados.');

  } catch (error) {
    console.error('Error en la semilla:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 