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
exports.PackageController = void 0;
class PackageController {
    constructor(packageService) {
        this.packageService = packageService;
    }
    createPackage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const travelPackage = yield this.packageService.create(req.body);
                res.status(201).json(travelPackage);
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
    }
    getAllPackages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const packages = yield this.packageService.getAll();
                res.json(packages);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
    getPackageById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const travelPackage = yield this.packageService.getById(req.params.id);
                if (!travelPackage) {
                    res.status(404).json({ message: 'Package not found' });
                    return;
                }
                res.json(travelPackage);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
    updatePackage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedPackage = yield this.packageService.update(req.params.id, req.body);
                if (!updatedPackage) {
                    res.status(404).json({ message: 'Package not found' });
                    return;
                }
                res.json(updatedPackage);
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
    }
    deletePackage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedPackage = yield this.packageService.remove(req.params.id);
                if (!deletedPackage) {
                    res.status(404).json({ message: 'Package not found' });
                    return;
                }
                res.json({ message: 'Deleted successfully' });
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
}
exports.PackageController = PackageController;
