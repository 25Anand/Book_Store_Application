import { MailService } from './nodeMailer';
export declare class EmailService {
    private readonly mailService;
    constructor(mailService: MailService);
    sendBulkEmails(emails: string[], subject: string, content: string): Promise<void>;
}
