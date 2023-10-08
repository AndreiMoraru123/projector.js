"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operation = void 0;
const path_1 = __importDefault(require("path"));
var Operation;
(function (Operation) {
    Operation[Operation["Print"] = 0] = "Print";
    Operation[Operation["Add"] = 1] = "Add";
    Operation[Operation["Remove"] = 2] = "Remove";
})(Operation || (exports.Operation = Operation = {}));
function getPwd(opts) {
    if (opts.pwd)
        return opts.pwd;
    return process.cwd();
}
function getConfig(opts) {
    if (opts.config) {
        return opts.config;
    }
    const home = process.env["HOME"];
    const loc = process.env["APPDATA"] || home;
    if (!loc) {
        throw new Error("unable to determine config location");
    }
    if (loc === home) {
        return path_1.default.join(loc, ".projector.json");
    }
    return path_1.default.join(loc, "projection", "projector.json");
}
function getArgs(opts) {
    if (!opts.args || opts.args.length === 0) {
        return [];
    }
    const operation = getOperation(opts);
    if (operation === Operation.Print) {
        if (opts.args.length > 1) {
            throw new Error(`expected 0 or 1 args but got ${opts.args.length}`);
        }
        return opts.args;
    }
    if (operation === Operation.Add) {
        if (opts.args.length !== 3) {
            throw new Error(`expected 2 or 3 args but got ${opts.args.length - 1}`);
        }
        return opts.args.slice(1);
    }
    if (opts.args.length !== 2) {
        throw new Error(`expected 1 or 2 args but got ${opts.args.length - 1}`);
    }
    return opts.args.slice(1);
}
function getOperation(opts) {
    if (!opts.args || opts.args.length === 0) {
        return Operation.Print;
    }
    if (opts.args[0] === "add") {
        return Operation.Add;
    }
    if (opts.args[0] === "rm") {
        return Operation.Remove;
    }
    return Operation.Print;
}
function config(opts) {
    return {
        pwd: getPwd(opts),
        config: getConfig(opts),
        args: getArgs(opts),
        operation: getOperation(opts),
    };
}
exports.default = config;
