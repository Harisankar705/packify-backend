import { IPackageService, IPackageRepository } from "../interfaces/interfaces";
import { ITravelPackage } from "../models/package";

export class PackageService implements IPackageService {
  constructor(private packageRepository: IPackageRepository) {}

  async create(data: ITravelPackage): Promise<ITravelPackage> {
    return await this.packageRepository.create(data);
  }

  async getAll(): Promise<ITravelPackage[]> {
    return await this.packageRepository.findAll();
  }

  async getById(id: string): Promise<ITravelPackage | null> {
    return await this.packageRepository.findById(id);
  }

  async update(id: string, data: Partial<ITravelPackage>): Promise<ITravelPackage | null> {
    return await this.packageRepository.update(id, data);
  }

  async remove(id: string): Promise<ITravelPackage | null> {
    return await this.packageRepository.remove(id);
  }
}
