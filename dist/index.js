"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nunjucks = require("nunjucks");
const sfn_1 = require("sfn");
class NunjucksEngine extends sfn_1.TemplateEngine {
    constructor(options = {}) {
        super(options);
        this._engine = nunjucks.configure(Object.assign({
            noCache: !options.cache
        }, options));
    }
    renderFile(filename, vars = {}) {
        return new Promise((resolve, reject) => {
            this._engine.render(filename, vars, (err, contents) => {
                err ? reject(err) : resolve(contents);
            });
        });
    }
}
exports.NunjucksEngine = NunjucksEngine;
//# sourceMappingURL=index.js.map