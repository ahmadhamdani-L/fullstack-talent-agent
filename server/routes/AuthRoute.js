// 1. import module Router
import { Router } from 'express';
import indexCtrl from '../controllers/IndexController'


const router = Router();
router.get('/read',indexCtrl.AuthCtrl.requireSignin,indexCtrl.AuthCtrl.findAll);
router.post('/signin', indexCtrl.AuthCtrl.signin);
router.post('/signup', indexCtrl.AuthCtrl.createAvatar);
router.get('/signout', indexCtrl.AuthCtrl.signout);
router.put('/update/:id', indexCtrl.AuthCtrl.update);
router.delete('/delete/:id', indexCtrl.AuthCtrl.remove);
router.get("/select/:id", indexCtrl.AuthCtrl.findOne);

export default router;
