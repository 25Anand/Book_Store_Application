import { PurchaseBookDto } from "./dto/purchase.dto";
import { HttpResponse } from "src/common/httpResponse";
import { PurchasesService } from "./purchases.service";
export declare class PurchaseBookController {
    private readonly httpResponse;
    private readonly purchaseService;
    constructor(httpResponse: HttpResponse, purchaseService: PurchasesService);
    purchase(purchaseBookDto: PurchaseBookDto, response: Response): Promise<void>;
}
