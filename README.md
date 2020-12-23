TODO:

Existential threat:

Union types are more flexible than sum types

Solutions:
- We need to convert all union types into tagged unions
- Tagged unions can be converted into Rust enums

We use the duplicate pattern (all enum types have an associated interface). This fits naturally.

In Typescript, all union types are collections of interfaces. Sometimes, the interfaces
have type tags, which can be removed since those can be merged into the enum itself.

We can name all anon unions. Since we have underlying interface types, switching between
two diff enum variants should not be an issue.

Concrete code examples we should work out:

The following 

```
parsePattern(params, kind?: string): Node.BindingIdentifier | Node.BindingPattern {
 let pattern;

 if (this.match('[')) {
     pattern = this.parseArrayPattern(params, kind);
 } else if (this.match('{')) {
     pattern = this.parseObjectPattern(params, kind);
 } else {
     if (this.matchKeyword('let') && (kind === 'const' || kind === 'let')) {
         this.tolerateUnexpectedToken(this.lookahead, Messages.LetInLexicalBinding);
     }
     params.push(this.lookahead);
     pattern = this.parseVariableIdentifier(kind);
 }

 return pattern;
}
```

We need to figure out how to assign pattern in multiple
places. We can probably use if-let expressions for this.

We can implement explicit union casting if one union is
smaller than another union.

E.g if function returns A | B, but the variable can be
A | B | C, we can unravel at the call site. Or we can
generate union casting functions.
