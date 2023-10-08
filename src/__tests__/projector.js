"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const projector_1 = __importDefault(require("../projector"));
const config_1 = require("../config");
function getData() {
    return {
        projector: {
            "/": {
                "foo": "bar",
                "fem": "is_great",
            },
            "/foo": {
                "foo": "bar2",
            },
            "/foo/bar": {
                "foo": "bar3",
            },
        }
    };
}
function getProjector(pwd, data = getData()) {
    return new projector_1.default({
        args: [],
        operation: config_1.Operation.Print,
        pwd,
        config: "Hello, Frontend Masters"
    }, data);
}
test("getValueAll", function () {
    const proj = getProjector("/foo/bar");
    expect(proj.getValueAll()).toEqual({
        "fem": "is_great",
        "foo": "bar3",
    });
});
test("getValue", function () {
    let proj = getProjector("/foo/bar");
    expect(proj.getValue("foo")).toEqual("bar3");
    proj = getProjector("/foo");
    expect(proj.getValue("foo")).toEqual("bar2");
    expect(proj.getValue("fem")).toEqual("is_great");
});
test("setValue", function () {
    let data = getData();
    let proj = getProjector("/foo/bar", data);
    proj.setValue("foo", "baz");
    expect(proj.getValue("foo")).toEqual("baz");
    proj.setValue("fem", "is_better_than_great");
    expect(proj.getValue("fem")).toEqual("is_better_than_great");
    proj = getProjector("/", data);
    expect(proj.getValue("fem")).toEqual("is_great");
});
test("removeValue", function () {
    const proj = getProjector("/foo/bar");
    proj.removeValue("fem");
    expect(proj.getValue("fem")).toEqual("is_great");
    proj.removeValue("foo");
    expect(proj.getValue("foo")).toEqual("bar2");
});
