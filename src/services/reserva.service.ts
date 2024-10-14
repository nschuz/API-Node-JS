const { Reserva, Evento } = require("../models");

export class ReservaService {

    static async findAll() {
        const reservas = await Reserva.findAll({
            include: {
                model: Evento,
                as: 'evento',  
            },
        });
        return reservas;
    }

    static async create(data: { evento_id: string, nombre_usuario: string, cantidad_boletos: number, fecha_reserva: Date }) {
        const nuevaReserva = await Reserva.create({
            evento_id: data.evento_id,
            nombre_usuario: data.nombre_usuario,
            cantidad_boletos: data.cantidad_boletos,
            fecha_reserva: data.fecha_reserva,
        });
        return nuevaReserva;
    }


    static async findById(id: string) {
        const reserva = await Reserva.findByPk(id, {
            include: {
                model: Evento,
                as: 'evento',  
            },
        });
        return reserva;
    }

    
    static async update(data: { id: string, evento_id: string, nombre_usuario: string, cantidad_boletos: number, fecha_reserva: Date }) {
        const reserva = await Reserva.findByPk(data.id);

        if (!reserva) {
            throw new Error("Reserva no encontrada");
        }

        reserva.evento_id = data.evento_id;
        reserva.nombre_usuario = data.nombre_usuario;
        reserva.cantidad_boletos = data.cantidad_boletos;
        reserva.fecha_reserva = data.fecha_reserva;

        await reserva.save();
        return reserva;
    }

    static async delete(id: string) {
        const reserva = await Reserva.findByPk(id);

        if (!reserva) {
            throw new Error("Reserva no encontrada");
        }

        await reserva.destroy();
        return { message: "Reserva eliminada correctamente" };
    }
}
