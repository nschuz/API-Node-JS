import express from "express";
import eventosRoutes from "./eventos.routes";
import reservasRoutes from "./reservas.routes";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("It works!");
});


router.use("/eventos", eventosRoutes);
router.use("/reservas", reservasRoutes);


export default router;
