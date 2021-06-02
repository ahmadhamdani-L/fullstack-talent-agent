import { Router } from "express";
import IndexCtrl from "../controllers/IndexController";

const router = Router();
router.post("/create/",  IndexCtrl.TalentCtrl.create);
router.put("/update/:id", IndexCtrl.TalentCtrl.update);
router.get("/read", IndexCtrl.TalentCtrl.findAll);
router.get("/select/:id", IndexCtrl.TalentCtrl.findOne);
router.delete("/delete/:id", IndexCtrl.TalentCtrl.remove);
//


/* router.post('/d', 
    IndexCtrl.TalentCtrl.createTalent,
    IndexCtrl.TalentCommentCtrl.create,
    IndexCtrl.TalentCtrl.findOne); */

export default router;
