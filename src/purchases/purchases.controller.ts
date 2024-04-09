  import { Body, Controller, Post, Res } from "@nestjs/common";
  import { PurchaseBookDto } from "./dto/purchase.dto";
  import { RESPONSE_DATA } from "src/common/response";
  import { HttpResponse } from "src/common/httpResponse";
  import { PurchasesService } from "./purchases.service";

  @Controller()
  export class PurchaseBookController{
      constructor(private readonly httpResponse:HttpResponse,private readonly purchaseService:PurchasesService){}

    /**
     * @author Book_Store
     * @description This function will used to purchase the bbok
     * @Body PurchaseBookDto
     */
    @Post('/purchase')
    async purchase(@Body() purchaseBookDto: PurchaseBookDto, @Res() response: Response) {
      try{
        const result= await this.purchaseService.purchaseBook(purchaseBookDto);
        return this.httpResponse.sendResponse(response, RESPONSE_DATA.SUCCESS,result);
      }
      catch(error){
        console.error("error in login ",error)
      }
    }
  }
