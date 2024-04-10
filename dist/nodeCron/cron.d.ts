import { EmailService } from '../nodeMailer/bulkMail';
export declare class CronService {
    private readonly emailService;
    private lastNotificationTime;
    constructor(emailService: EmailService);
    handleCron(): Promise<void>;
}
