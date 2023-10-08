import {Config} from "./config";
import * as fs from "fs";
import path from "path";

export type Data = {
  projector: {
    // pwd
    [key: string]: {
      // key -> value
      [key: string]: string,
    }
  }
}

const defaultData = {
  projector: {}
};

export default class Projector {

  constructor(private config: Config, private data: Data) {}


  getValueAll() : {[key: string] : string}{

    let curr = this.config.pwd;
    let prev = "";
    const paths = []

    do {
      prev = curr;
      paths.push(curr)
      curr = path.dirname(curr);
    } while (curr != prev);

    return paths.reverse().reduce((acc, path) => {
      const value = this.data.projector[path];
      if (value) {
        Object.assign(acc, value)
      }
      return acc
    }, {});
  }

  getValue(key: string): string | undefined {

    let curr = this.config.pwd;
    let prev = "";

    let out: string | undefined = undefined;

    do {
      const value = this.data.projector[curr]?.[key]

      if (value) {
        out = value;
        break;
      }

      prev = curr;
      curr = path.dirname(curr);

    } while (curr != prev);

    return out
  }

  setValue(key: string, value: string) {
    let pwd = this.config.pwd;
    if (!this.data.projector[pwd]) {
      this.data.projector[pwd] = {}
    }

    this.data.projector[pwd][key] = value;
  }

  removeValue(key: string){
    delete this.data.projector[this.config.pwd]?.[key];
  }

  static fromConfig(config: Config): Projector {
    if (fs.existsSync(config.config)) {
      let data: Data;
      try {
        data = JSON.parse(fs.readFileSync(config.config).toString());
      } catch (e) {
        data = defaultData;
      }
      return new Projector(config, data)
    }
    return new Projector(config, defaultData);
  }
}