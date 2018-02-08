# Sfn-Nunjucks-Engine

**Nunjucks template engine for [sfn](https://github.com/hyurl/sfn) framework.**

For more informatioin about nunjucks, please visit 
[https://mozilla.github.io/nunjucks/](https://mozilla.github.io/nunjucks/).

## Install

```sh
npm i sfn-nunjucks-engine
```

## Example

```typescript
import { HttpController, route } from "sfn";
import { NunjucksEngine } from "sfn-nunjucks-engine";

var engine = new NunjucksEngine();

export default class extends HttpController {
    engine: NunjucksEngine = engine;

    @route.get("/nunjucks-test")
    index() {
        return this.view("nunjucks-test.nunjucks");
    }
}
```

## API

### `new NunjucksEngine(options?: NunjucksOptions)`

Interface `NunjucksOptions` includes:

- `autoescape: boolean` (default: `true`) controls if output with dangerous 
    characters are escaped automatically.
- `throwOnUndefined: boolean` (default: `false`) throw errors when outputting 
    a null/undefined value.
- `trimBlocks: boolean` (default: `false`) automatically remove trailing 
    newlines from a block/tag.
- `lstripBlocks: boolean` (default: `false`) automatically remove leading 
    whitespace from a block/tag.
- `watch: boolean` (default: `false`) reload templates when they are changed 
    (server-side). To use watch, make sure optional dependency `chokidar` is 
    installed.
- `tags: object` defines the syntax for nunjucks tags.