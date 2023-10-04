"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_line_args_1 = __importDefault(require("command-line-args"));
function getOpts() {
    return (0, command_line_args_1.default)([{
            name: "args",
            defaultOption: true,
            multiple: true,
            type: String,
        }, {
            name: "config",
            alias: "c",
            type: String,
        }, {
            name: "pwd",
            alias: "p",
            type: String,
        }]);
}
exports.default = getOpts;
