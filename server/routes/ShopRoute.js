import { Router } from "express";
import IndexCtrl from "../controllers/IndexController";
const router = Router();

/* router.post('/cart',IndexCtrl.AuthCtrl.check,
                    IndexCtrl.TalentCartCtrl.createcart,
                    IndexCtrl.AuthCtrl.findOne)

router.post("/lite/:id",IndexCtrl.AuthCtrl.checkL,
                        IndexCtrl.TalentCtrl.findOne,
                        IndexCtrl.TalentCartCtrl.createc,
                        IndexCtrl.LiteItemCtrl.createlite);


router.post("/order", IndexCtrl.TalentCartCtrl.findOne1,
                        IndexCtrl.TalentCtrl.findOne1,
                        IndexCtrl.OrderCtrl.create,
                        IndexCtrl.TalentCartCtrl.update1,
                        IndexCtrl.LiteItemCtrl.update1)
                        
 */
 router.post('/item/:id',IndexCtrl.AuthCtrl.cekUser,
                        IndexCtrl.TalentCartCtrl.cekcart,
                        IndexCtrl.TalentCartCtrl.create,
                        IndexCtrl.TalentCtrl.findout,
                       IndexCtrl.LiteItemCtrl.ceklite,
                        IndexCtrl.LiteItemCtrl.createlite);

router.post('/order/:id', IndexCtrl.AuthCtrl.cekUser,
                         IndexCtrl.TalentCartCtrl.cekcart,
                         IndexCtrl.TalentCartCtrl.findqty,
                         IndexCtrl.OrderCtrl.payment,
                         IndexCtrl.OrderCtrl.cekord,
                         IndexCtrl.OrderCtrl.create,
                         IndexCtrl.TalentCartCtrl.closecart,
                         IndexCtrl.LiteItemCtrl.checkline);
                         
router.put('/lite/:id', IndexCtrl.AuthCtrl.cekUser,
                       IndexCtrl.TalentCartCtrl.cekcart,
                       IndexCtrl.TalentCtrl.findout,
                      IndexCtrl.LiteItemCtrl.ceklite,
                       IndexCtrl.LiteItemCtrl.updatelite);

router.get('/select/:id', IndexCtrl.OrderCtrl.findOne)

router.put('/cancel/:id', IndexCtrl.AuthCtrl.cekUser,
                          IndexCtrl.OrderCtrl.cekord,
                          IndexCtrl.TalentCartCtrl.cekcartclose,
                          IndexCtrl.OrderCtrl.cancel,
                          IndexCtrl.TalentCartCtrl.opencart,
                          IndexCtrl.LiteItemCtrl.cancelitem)

router.put('/ordered/:id', IndexCtrl.AuthCtrl.cekUser,
                          IndexCtrl.OrderCtrl.cekord,
                          IndexCtrl.TalentCartCtrl.cekcartclose,
                          IndexCtrl.TalentCartCtrl.findqty,
                          IndexCtrl.OrderCtrl.cekord,
                          IndexCtrl.OrderCtrl.update,
                          IndexCtrl.LiteItemCtrl.checkpay);

router.get('/s/:id', IndexCtrl.OrderCtrl.history)

                          

export default router;