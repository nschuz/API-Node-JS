import express from "express";
import { EventosController } from "../controllers";
const router = express.Router();

router.get("/", EventosController.getAllEventos);
router.post("/", EventosController.createEvento);

router.get("/:id", EventosController.getEventoById); 
router.put("/:id", EventosController.updateEvento);   
router.delete("/:id", EventosController.deleteEvento); 
export default router