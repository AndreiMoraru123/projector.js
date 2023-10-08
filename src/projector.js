"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const defaultData = {
    projector: {}
};
class Projector {
    constructor(config, data) {
        this.config = config;
        this.data = data;
    }
    getValueAll() {
        let curr = this.config.pwd;
        let prev = "";
        const paths = [];
        do {
            prev = curr;
            paths.push(curr);
            curr = path_1.default.dirname(curr);
        } while (curr != prev);
        return paths.reverse().reduce((acc, path) => {
            const value = this.data.projector[path];
            if (value) {
                Object.assign(acc, value);
            }
            return acc;
        }, {});
    }
    getValue(key) {
        var _a;
        let curr = this.config.pwd;
        let prev = "";
        let out = undefined;
        do {
            const value = (_a = this.data.projector[curr]) === null || _a === void 0 ? void 0 : _a[key];
            if (value) {
                out = value;
                break;
            }
            prev = curr;
            curr = path_1.default.dirname(curr);
        } while (curr != prev);
        return out;
    }
    setValue(key, value) {
        let pwd = this.config.pwd;
        if (!this.data.projector[pwd]) {
            this.data.projector[pwd] = {};
        }
        this.data.projector[pwd][key] = value;
    }
    removeValue(key) {
        var _a;
        (_a = this.data.projector[this.config.pwd]) === null || _a === void 0 ? true : delete _a[key];
    }
    static fromConfig(config) {
        if (fs.existsSync(config.config)) {
            let data;
            try {
                data = JSON.parse(fs.readFileSync(config.config).toString());
            }
            catch (e) {
                data = defaultData;
            }
            return new Projector(config, data);
        }
        return new Projector(config, defaultData);
    }
}
exports.default = Projector;
