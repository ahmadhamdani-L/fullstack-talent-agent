import { Router } from "express";
import IndexCtrl from "../controllers/IndexController";

const router = Router();
/* router.post("/", IndexCtrl.UploadDownloadCtrl.upload); */
router.post("/upload",IndexCtrl.UploadDownloadCtrl.uploadMultipart,IndexCtrl.TalentImageCtrl.create,IndexCtrl.TalentImageCtrl.findAll);
router.get("/read", IndexCtrl.TalentImageCtrl.findAll);
router.get("/:filename", IndexCtrl.UploadDownloadCtrl.download);
router.delete("/delete/:id", IndexCtrl.TalentImageCtrl.remove); 

export default router;
