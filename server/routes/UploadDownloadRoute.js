import { Router } from 'express';
import IndexCtrl from '../controllers/IndexController'

const router = Router();
//router.post('/', IndexCtrl.UploadDownloadCtrl.uploadFile);
//router.post('/emps/:id', IndexCtrl.UploadDownloadCtrl.uploadFile,IndexCtrl.EmployeesCtrl.update);
/* router.post('/multipart/', IndexCtrl.UploadDownloadCtrl.uploadMultipleFiles,
IndexCtrl.EmployeesCtrl.createProfile,
IndexCtrl.EmployeesCtrl.findEmployeeImages); */
/* router.get('/:filename', IndexCtrl.UploadDownloadCtrl.downloadFile); */
export default router;