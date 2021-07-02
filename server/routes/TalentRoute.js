import { Router } from "express";
import IndexCtrl from "../controllers/IndexController";

const router = Router();
router.post("/create/",  IndexCtrl.TalentCtrl.create);
router.put("/update/:id", IndexCtrl.TalentCtrl.update);
router.get("/read", IndexCtrl.TalentCtrl.findAll);
router.get("/select/:id", IndexCtrl.TalentCtrl.findOne2);
router.get("/detail/:id", IndexCtrl.TalentCtrl.findOne3);
router.delete("/delete/:id", IndexCtrl.TalentCtrl.remove);
//

router.post('/profile', IndexCtrl.TalentCtrl.createProfile);
router.get('/photo/:filename', IndexCtrl.TalentCtrl.photo,
IndexCtrl.TalentCtrl.defaultPhoto);

router.get('/search', IndexCtrl.TalentCtrl.findAllSearch);
router.get('/paging', IndexCtrl.TalentCtrl.talentPaging);
router.get('/paging/:id', IndexCtrl.TalentCtrl.talentPaging);

/* router.post('/d', 
    IndexCtrl.TalentCtrl.createTalent,
    IndexCtrl.TalentCommentCtrl.create,
    IndexCtrl.TalentCtrl.findOne); */

export default router;
