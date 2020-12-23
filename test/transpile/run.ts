import * as path from "path";
import * as fs from "fs";

import test from "ava";

import { compileDirectoryToRust } from "@src/index";

const files = fs.readdirSync(__dirname);
for (const file of files) {
  const absPath = path.join(__dirname, file);
  const stat = fs.lstatSync(absPath);
  if (stat.isDirectory()) {
    const tsConfigPath = path.join(absPath, "tsconfig.json");
    compileDirectoryToRust(tsConfigPath);
  }
}
