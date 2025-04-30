"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageRepository = void 0;
class PackageRepository {
    constructor(packageModel) {
        this.packageModel = packageModel;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.packageModel.create(data);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.packageModel.find();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.packageModel.findById(id);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.packageModel.findByIdAndUpdate(id, data, { new: true });
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.packageModel.findByIdAndDelete(id);
        });
    }
}
exports.PackageRepository = PackageRepository;
