import { Router } from "express";
import IndexCtrl from "../controllers/IndexController";

const router = Router();
router.post("/create", IndexCtrl.TalentCommentCtrl.create);
router.put("/update/:id", IndexCtrl.TalentCommentCtrl.update);
router.get("/read", IndexCtrl.TalentCommentCtrl.findAll);
router.get("/select/:id", IndexCtrl.TalentCommentCtrl.findOne);
router.delete("/delete/:id", IndexCtrl.TalentCommentCtrl.remove);


export default router;
