import express from "express";
import { ReservasController } from "../controllers/reservas.controller"; 
const router = express.Router();

router.get("/", ReservasController.getAllReservas);
router.post("/", ReservasController.createReserva);
router.get("/:id", ReservasController.getReservaById);
router.put("/:id", ReservasController.updateReserva);
router.delete("/:id", ReservasController.deleteReserva);

export default router;
