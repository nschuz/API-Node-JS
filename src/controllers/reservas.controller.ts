import { Request, Response } from "express";
import { ReservaService } from "../services/reserva.service";
import { EventoService } from "../services/evento.service"; 

export class ReservasController {

    static async getAllReservas(req: Request, res: Response) {
        try {
            const reservas = await ReservaService.findAll();
            res.json(reservas);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las reservas" });
        }
    }

    static async createReserva(req: Request, res: Response) {
        try {
            const { evento_id, nombre_usuario, cantidad_boletos, fecha_reserva } = req.body;

            if (!evento_id || !nombre_usuario || !cantidad_boletos || !fecha_reserva) {
                return res.status(400).json({ error: "Todos los campos son requeridos: evento_id, nombre_usuario, cantidad_boletos, fecha_reserva" });
            }

            const evento = await EventoService.findById(evento_id);
            if (!evento) {
                return res.status(404).json({ error: "El evento no existe" });
            }

            const reserva = await ReservaService.create({ evento_id, nombre_usuario, cantidad_boletos, fecha_reserva });
            res.status(201).json(reserva);
        } catch (error) {
            res.status(500).json({ error: "Error al crear la reserva" });
        }
    }

    static async getReservaById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: "El ID de la reserva es requerido" });
            }

            const reserva = await ReservaService.findById(id);
            if (!reserva) {
                return res.status(404).json({ error: "Reserva no encontrada" });
            }

            res.json(reserva);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener la reserva" });
        }
    }

    static async updateReserva(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { evento_id, nombre_usuario, cantidad_boletos, fecha_reserva } = req.body;

            if (!id || !evento_id || !nombre_usuario || !cantidad_boletos || !fecha_reserva) {
                return res.status(400).json({ error: "Todos los campos son requeridos: id, evento_id, nombre_usuario, cantidad_boletos, fecha_reserva" });
            }

            const evento = await EventoService.findById(evento_id);
            if (!evento) {
                return res.status(404).json({ error: "El evento no existe" });
            }

            const reserva = await ReservaService.update({ id, evento_id, nombre_usuario, cantidad_boletos, fecha_reserva });
            res.status(200).json(reserva);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar la reserva" });
        }
    }

    static async deleteReserva(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: "El ID de la reserva es requerido" });
            }

            const reserva = await ReservaService.delete(id);
            if (!reserva) {
                return res.status(404).json({ error: "Reserva no encontrada" });
            }

            res.status(200).json({ message: "Reserva eliminada correctamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar la reserva" });
        }
    }
}
