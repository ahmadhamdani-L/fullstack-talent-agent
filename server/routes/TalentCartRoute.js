import { Router } from "express";
import IndexCtrl from "../controllers/IndexController";

const router = Router();
router.post("/create/",  IndexCtrl.TalentCartCtrl.create);
router.put("/update/:id", IndexCtrl.TalentCartCtrl.update);
router.get("/read", IndexCtrl.TalentCartCtrl.findAll);
router.get("/select/:id", IndexCtrl.TalentCartCtrl.findOne);
router.delete("/delete/:id", IndexCtrl.TalentCartCtrl.remove);

router.post("/order", IndexCtrl.TalentCartCtrl.findOne1,
                        IndexCtrl.TalentCtrl.findOne1,
                        IndexCtrl.OrderCtrl.create,
                        IndexCtrl.TalentCartCtrl.update1,
                        IndexCtrl.LiteItemCtrl.update1)

                        router.post('/cart',IndexCtrl.AuthCtrl.check,
                    IndexCtrl.TalentCartCtrl.createcart,
                    IndexCtrl.AuthCtrl.findOne)

                        router.post("/lite/:id",IndexCtrl.AuthCtrl.checkL,
                        IndexCtrl.TalentCtrl.findOne,
                        IndexCtrl.TalentCartCtrl.createc,
                        IndexCtrl.LiteItemCtrl.createlite);

                        




                    

export default router;
