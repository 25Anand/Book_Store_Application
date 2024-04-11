import handlebars from "handlebars";
import fs from "fs";
class HtmlTemplateMaker {
  /**
   * @description Render html file with mapped data
   * @param data object for mapping data object
   * @param HTMLTemplatePath path of html file
   * @returns return html content
   */
  async makeHtmlTemplate(HTMLTemplatePath: string, data: any) {
    let templateContent: string;
    try {
      console.log("<<<<<<<<>>>>>>>>>>>", HTMLTemplatePath);
      templateContent = fs.readFileSync(`${HTMLTemplatePath}`, "utf8");
    } catch (error) {
      console.error(error);
    }
    try {
      const template = handlebars.compile(templateContent, { noEscape: true }); //, { noEscape: true }
      const mailBody = template(data);
      return mailBody;
    } catch (error) {
      throw error;
    }
  }
}
export const htmlTemplateMaker = new HtmlTemplateMaker();
