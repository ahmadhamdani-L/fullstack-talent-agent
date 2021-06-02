import { Router } from "express";
import IndexCtrl from "../controllers/IndexController";

const router = Router();
router.post("/create/",  IndexCtrl.LiteItemCtrl.create);
router.put("/update/:id", IndexCtrl.LiteItemCtrl.update);
router.get("/read", IndexCtrl.LiteItemCtrl.findAll);
router.get("/select/:id", IndexCtrl.LiteItemCtrl.findOne);
router.delete("/delete/:id", IndexCtrl.LiteItemCtrl.remove);

export default router;
