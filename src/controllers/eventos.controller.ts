import { NextFunction, Request, Response } from "express";
import { EventoService } from "../services/evento.service";

export class EventosController {

    
    static async getAllEventos(req: any, res: any) {
        try {
            const eventos = await EventoService.findAll();
            res.json(eventos);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los eventos" });
        }
    }
    
    static async createEvento(req: any, res: any) {
        try {
            const { nombre, fecha, ubicacion } = req.body;
    
            if (!nombre || !fecha || !ubicacion) {
                return res.status(400).json({ error: "Todos los campos son requeridos: nombre, fecha, ubicacion" });
            }
            
            const evento = await EventoService.create({ nombre, fecha, ubicacion });

            res.status(201).json(evento);  
        } catch (error) {
            res.status(500).json({ error: "Error al crear el evento" });
        }
    }
    
    static async getEventoById(req: any, res: any) {

        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: "Todos los campos son requeridos: id" });
            }
            const evento = await EventoService.findById(id);
            res.json(evento);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el evento" });
        }

    }
    
    static async updateEvento(req: any, res: any) {
        try {
            
            const { id } = req.params;
            const { nombre, fecha, ubicacion } = req.body;
    
            if (!id || !nombre || !fecha || !ubicacion) {
                return res.status(400).json({ error: "Todos los campos son requeridos: id, nombre, fecha, ubicacion" });
            }
            
            const evento = await EventoService.update({ id, nombre, fecha, ubicacion });

            res.status(201).json(evento);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el evento" });
        }
    }


    static async deleteEvento(req: any, res: any) {
        try {
            const { id } = req.params;
    
            if (!id) {
                return res.status(400).json({ error: "Todos los campos son requeridos: id" });
            }
            
            const evento = await EventoService.delete(id);

            res.status(201).json(evento);   
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el evento" });
        }
    }
    
}