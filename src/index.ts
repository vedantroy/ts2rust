import { Project, StructureKind, SyntaxKind, ts } from "ts-morph";
import * as path from "path";

export function compileDirectoryToRust(tsConfigFilePath: string) {
  const throwErrOnRelativePath = (p: string) => {
    throw new Error(`Expected "${p}" to be absolute`);
  };
  if (!path.isAbsolute(tsConfigFilePath)) {
    throwErrOnRelativePath(tsConfigFilePath);
  }

  const project = new Project({
    compilerOptions: {
      // To translate code to Rust we need as much static typing as possible
      allowJs: false,
    },
    tsConfigFilePath,
  });
  const program = project.getProgram();
  const { compilerObject: c } = program;

  const srcFileNames = c.getRootFileNames();
  // We don't use `c.getRootFileNames` b/c it returns many not useful files like .d.ts files
  const srcFiles = srcFileNames.map((name) => {
    const file = c.getSourceFileByPath(name as ts.Path);
    if (file === undefined) {
      throw new Error(`Could not find source file for path: ${name}`);
    }
    return file;
  });

  for (const srcFile of srcFiles) {
    buildFileAst(srcFile);
    console.log("===");
  }
}

function buildFileAst(file: ts.SourceFile) {
  const { statements } = file;
  for (const stmt of statements) {
    if (ts.isTypeAliasDeclaration(stmt)) {
      console.log(stmt);
      console.log("match");
      break;
    }
  }
}
