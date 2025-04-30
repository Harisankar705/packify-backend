import { Types, Model } from 'mongoose'; 
import { ITravelPackage, packageModel } from '../models/package';
import { IPackageRepository } from '../interfaces/interfaces';
export class PackageRepository implements IPackageRepository {
  private packageModel: Model<ITravelPackage>;  
  constructor(packageModel: Model<ITravelPackage>) {
    this.packageModel = packageModel;
  }

  async create(data: ITravelPackage): Promise<ITravelPackage> {
    return await this.packageModel.create(data);
  }

  async findAll(): Promise<ITravelPackage[]> {
    return await this.packageModel.find();
  }

  async findById(id: string | Types.ObjectId): Promise<ITravelPackage | null> {
    return await this.packageModel.findById(id);
  }

  async update(id: string | Types.ObjectId, data: Partial<ITravelPackage>): Promise<ITravelPackage | null> {
    return await this.packageModel.findByIdAndUpdate(id, data, { new: true });
  }
  
  async remove(id: string | Types.ObjectId): Promise<ITravelPackage | null> {
    return await this.packageModel.findByIdAndDelete(id);
  }
}
