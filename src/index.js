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
const opts_1 = __importDefault(require("./opts"));
const config_1 = __importStar(require("./config"));
const projector_1 = __importDefault(require("./projector"));
const opts = (0, opts_1.default)();
const config = (0, config_1.default)(opts);
const proj = projector_1.default.fromConfig(config);
if (config.operation === config_1.Operation.Print) {
    if (config.args.length === 0) {
        console.log(JSON.stringify(proj.getValueAll()));
    }
    else {
        const value = proj.getValue(config.args[0]);
        if (value) {
            console.log(value);
        }
    }
}
if (config.operation === config_1.Operation.Add) {
    proj.setValue(config.args[0], config.args[1]);
    proj.save();
}
if (config.operation === config_1.Operation.Remove) {
    proj.removeValue(config.args[0]);
    proj.save();
}
