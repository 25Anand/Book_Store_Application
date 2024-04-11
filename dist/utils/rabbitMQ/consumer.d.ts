export declare class ConsumerNotification {
    private transporter;
    constructor();
    consumePurchaseNotifications(): Promise<void>;
    sendPurchaseEmail(email: string, purchaseData: any): Promise<void>;
}
