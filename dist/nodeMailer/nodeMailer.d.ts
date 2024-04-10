import { ConfigService } from "@nestjs/config";
export declare class MailService {
    private readonly configService;
    private transporter;
    constructor(configService: ConfigService);
    newBookPublished(email: string, bookTitle: string): Promise<void>;
    sendPurchaseEmail(email: string, purchaseData: any): Promise<void>;
    sendmailtoauthor(authoremail: string, author: string, revenue: any): Promise<void>;
}
