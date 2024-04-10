import { RevenueCalculationService } from 'src/revenue/revenue.service';
export declare class RevenueService {
    private readonly revenueCalculationService;
    constructor(revenueCalculationService: RevenueCalculationService);
    calculateRevenueAndSendEmails(): Promise<void>;
}
