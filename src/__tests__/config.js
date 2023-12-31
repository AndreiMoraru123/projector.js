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
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importStar(require("../config"));
test("simple print all", function () {
    const config = (0, config_1.default)({});
    expect(config.operation).toEqual(config_1.Operation.Print);
    expect(config.args).toEqual([]);
});
test("print key", function () {
    const config = (0, config_1.default)({
        args: ["foo"],
    });
    expect(config.operation).toEqual(config_1.Operation.Print);
    expect(config.args).toEqual(["foo"]);
});
test("add key value", function () {
    const config = (0, config_1.default)({
        args: ["add", "foo", "bar"],
    });
    expect(config.operation).toEqual(config_1.Operation.Add);
    expect(config.args).toEqual(["foo", "bar"]);
});
test("rm key", function () {
    const config = (0, config_1.default)({
        args: ["rm", "foo"],
    });
    expect(config.operation).toEqual(config_1.Operation.Remove);
    expect(config.args).toEqual(["foo"]);
});
