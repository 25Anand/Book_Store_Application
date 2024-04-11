"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlTemplateMaker = void 0;
const handlebars_1 = require("handlebars");
const fs_1 = require("fs");
class HtmlTemplateMaker {
    async makeHtmlTemplate(HTMLTemplatePath, data) {
        let templateContent;
        try {
            console.log("<<<<<<<<>>>>>>>>>>>", HTMLTemplatePath);
            templateContent = fs_1.default.readFileSync(`${HTMLTemplatePath}`, "utf8");
        }
        catch (error) {
            console.error(error);
        }
        try {
            const template = handlebars_1.default.compile(templateContent, { noEscape: true });
            const mailBody = template(data);
            return mailBody;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.htmlTemplateMaker = new HtmlTemplateMaker();
//# sourceMappingURL=htmlHelper.js.map