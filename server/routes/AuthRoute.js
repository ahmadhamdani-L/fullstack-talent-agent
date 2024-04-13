// 1. import module Router
import { Router } from 'express';
import indexCtrl from '../controllers/IndexController'


const router = Router();
// router.get('/read',indexCtrl.AuthCtrl.requireSignin,indexCtrl.AuthCtrl.findAll);
router.post('/signin', indexCtrl.AuthCtrl.signin);
router.post('/signup', indexCtrl.AuthCtrl.signup);
router.get('/signout', indexCtrl.AuthCtrl.signout);
router.put('/update/:id', indexCtrl.AuthCtrl.cekUser,
                          indexCtrl.AuthCtrl.update);
router.delete('/delete/:id', indexCtrl.AuthCtrl.remove);
router.get("/select/:id", indexCtrl.AuthCtrl.findOneUserChart);

router.get('/photo/:id/:filename', indexCtrl.AuthCtrl.photo, 
                               indexCtrl.AuthCtrl.defaultPhoto)

export default router;
