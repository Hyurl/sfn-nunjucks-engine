import * as nunjucks from "nunjucks";
import { TemplateEngine, TemplateOptions } from "sfn";

export interface NunjucksOptions extends TemplateOptions {
    /**
     * (default: `true`) controls if output with dangerous characters are 
     * escaped automatically.
     * @see https://mozilla.github.io/nunjucks/api.html#autoescaping
     */
    autoescape?: boolean;
    /**
     * (default: `false`) throw errors when outputting a null/undefined value.
     */
    throwOnUndefined?: boolean;
    /**
     * (default: `false`) automatically remove trailing newlines from a 
     * block/tag.
     */
    trimBlocks?: boolean;
    /**
     * (default: `false`) automatically remove leading whitespace from a 
     * block/tag.
     */
    lstripBlocks?: boolean;
    /**
     * (default: `false`) reload templates when they are changed (server-side). 
     * To use watch, make sure optional dependency `chokidar` is installed.
     */
    watch?: boolean;
    /**
     * defines the syntax for nunjucks tags.
     * @see https://mozilla.github.io/nunjucks/api.html#customizing-syntax
     */
    tags?: {
        blockStart?: string,
        blockEnd?: string,
        variableStart?: string,
        variableEnd?: string,
        commentStart?: string,
        commentEnd?: string
    };
}

export class NunjucksEngine extends TemplateEngine {
    options: NunjucksOptions;
    private _engine: nunjucks.Environment;

    constructor(options: NunjucksOptions = {}) {
        super(options);
        this._engine = nunjucks.configure(Object.assign({
            noCache: !options.cache
        }, options));
    }

    renderFile(filename: string, vars: { [name: string]: any } = {}): Promise<string> {
        return new Promise((resolve, reject) => {
            this._engine.render(filename, vars, (err, contents) => {
                err ? reject(err) : resolve(contents);
            });
        });
    }
}