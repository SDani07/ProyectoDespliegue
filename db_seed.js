import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Recinto from './models/recinto.js';
import Evento from './models/evento.js';

dotenv.config();

async function seedDB() {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error('No se ha encontrado la variable MONGODB_URI en el fichero .env');
        }

        await mongoose.connect(mongoURI);
        console.log('Conectado a MongoDB');

        await Recinto.deleteMany({});
        await Evento.deleteMany({});
        console.log('Colecciones limpiadas correctamente');

        const recintosCreados = await Recinto.create([
            {
                nombre: 'Palacio de Congresos',
                direccion: 'Avenida de la Constitución 15',
                localidad: 'Madrid',
                aforoMaximo: 5000
            },
            {
                nombre: 'Auditorio Municipal',
                direccion: 'Calle Gran Vía 42',
                localidad: 'Valencia',
                aforoMaximo: 2500
            },
            {
                nombre: 'Teatro Principal',
                direccion: 'Plaza del Teatro 3',
                localidad: 'Alicante',
                aforoMaximo: 1200
            },
            {
                nombre: 'WiZink Center',
                direccion: 'Avenida de Felipe II s/n',
                localidad: 'Madrid',
                aforoMaximo: 15000
            },
            {
                nombre: 'Sala Santana 27',
                direccion: 'Calle Bolueta 2',
                localidad: 'Bilbao',
                aforoMaximo: 2000
            }
        ]);

        console.log(`${recintosCreados.length} recintos creados correctamente`);

        const entradasEstandar = [
            { tipo: 'VIP', precio: 75.00, disponibles: 10 },
            { tipo: 'Normal', precio: 30.00, disponibles: 10 }
        ];

        await Evento.create([
            {
                nombre: 'Festival de Rock Alternativo',
                fecha: new Date('2026-07-15T21:00:00.000Z'),
                entradas: entradasEstandar,
                recinto: recintosCreados[0]._id
            },
            {
                nombre: 'Concierto de Jazz Clásico',
                fecha: new Date('2026-08-20T20:30:00.000Z'),
                entradas: entradasEstandar,
                recinto: recintosCreados[1]._id
            },
            {
                nombre: 'Obra de Teatro: Comedia en 3 Actos',
                fecha: new Date('2026-09-10T19:00:00.000Z'),
                entradas: entradasEstandar,
                recinto: recintosCreados[2]._id
            },
            {
                nombre: 'Gira Mundial Pop Star',
                fecha: new Date('2026-10-05T22:00:00.000Z'),
                entradas: entradasEstandar,
                recinto: recintosCreados[3]._id
            },
            {
                nombre: 'Noche de Monólogos y Humor',
                fecha: new Date('2026-11-12T21:30:00.000Z'),
                entradas: entradasEstandar,
                recinto: recintosCreados[4]._id
            }
        ]);

        console.log('5 eventos creados y unidos a sus recintos con éxito');
        console.log('Base de datos poblada con éxito');

    } catch (error) {
        console.error('Error durante el proceso de seeding:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Conexión cerrada.');
    }
}

seedDB();