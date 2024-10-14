const { Evento } = require("../models");

export class EventoService {
    static async findById(id: number){
        return await Evento.findByPk(id)
    }

    static async findAll(){
        return await Evento.findAll();
    }

    static async create(evento: any){
        try {
            const nuevoEvento = await Evento.create(evento);
            return nuevoEvento; 
        } catch (error) {
            console.error("Error creando el evento: ", error);
            throw error; 
        }
    }


    static async update(evento: any){
        try {
            const actualizado = await Evento.update(evento, { where: { id: evento.id } });
            return actualizado; 
        } catch (error) {
            console.error("Error actualizando el evento: ", error);
            throw error; 
        }
    }


    static async delete(id: number){
        try {
            const eliminado = await Evento.destroy({ where: { id } });
            if (eliminado === 0) {
                throw new Error("No se encontro el evento");
            }
            return { message: "Evento eliminado correctamente" };
        } catch (error) {
            console.error("Error eliminando el evento: ", error);
            throw error; 
        }
    }   
}
