import express, { Router } from 'express';
import { PackageRepository } from '../repository/packageRepository';
import { packageModel } from '../models/package';
import { PackageService } from '../services/packageService';
import { PackageController } from '../controller/packageController';
import protect from '../middleware/protect';
const packageRouter: Router = express.Router();
const packageRepository = new PackageRepository(packageModel);
const packageService = new PackageService(packageRepository);
const packageController = new PackageController(packageService);

packageRouter.post('/', protect(['admin']), packageController.createPackage.bind(packageController));
packageRouter.put('/:id', protect(['admin']), packageController.updatePackage.bind(packageController));
packageRouter.delete('/:id', protect(['admin']), packageController.deletePackage.bind(packageController));
packageRouter.get('/', packageController.getAllPackages.bind(packageController));
packageRouter.get('/:id', packageController.getPackageById.bind(packageController));
export default packageRouter;
