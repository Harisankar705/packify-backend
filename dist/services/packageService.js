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
exports.PackageService = void 0;
class PackageService {
    constructor(packageRepository) {
        this.packageRepository = packageRepository;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.packageRepository.create(data);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.packageRepository.findAll();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.packageRepository.findById(id);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.packageRepository.update(id, data);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.packageRepository.remove(id);
        });
    }
}
exports.PackageService = PackageService;
