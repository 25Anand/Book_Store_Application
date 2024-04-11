declare class HtmlTemplateMaker {
    makeHtmlTemplate(HTMLTemplatePath: string, data: any): Promise<string>;
}
export declare const htmlTemplateMaker: HtmlTemplateMaker;
export {};
