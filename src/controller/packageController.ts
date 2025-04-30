import { Request, Response } from 'express';
import { IPackageController, IPackageService } from '../interfaces/interfaces';

export class PackageController implements IPackageController {
  private packageService: IPackageService;

  constructor(packageService: IPackageService) {
    this.packageService = packageService;
  }

  async createPackage(req: Request, res: Response): Promise<void> {
    try {
      const travelPackage = await this.packageService.create(req.body);
      res.status(201).json(travelPackage);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async getAllPackages(req: Request, res: Response): Promise<void> {
    try {
      const packages = await this.packageService.getAll();
      res.json(packages);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  async getPackageById(req: Request, res: Response): Promise<void> {
    try {
      const travelPackage = await this.packageService.getById(req.params.id);
      if (!travelPackage) {
        res.status(404).json({ message: 'Package not found' });
        return;
      }
      res.json(travelPackage);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  async updatePackage(req: Request, res: Response): Promise<void> {
    try {
      const updatedPackage = await this.packageService.update(req.params.id, req.body);
      if (!updatedPackage) {
        res.status(404).json({ message: 'Package not found' });
        return;
      }
      res.json(updatedPackage);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async deletePackage(req: Request, res: Response): Promise<void> {
    try {
      const deletedPackage = await this.packageService.remove(req.params.id);
      if (!deletedPackage) {
        res.status(404).json({ message: 'Package not found' });
        return;
      }
      res.json({ message: 'Deleted successfully' });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}
