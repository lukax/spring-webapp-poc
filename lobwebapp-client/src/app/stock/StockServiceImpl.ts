///<reference path="../reference.ts"/>

module stock {
  export class StockServiceImpl extends core.EntityServiceImpl<Stock> implements StockService {

    static $inject = ["$http"];
    constructor($http:ng.IHttpService) {
      super($http, "stock");
    }

    listUnit(successCallback:(data:string[], status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any,
             errorCallback:(data:core.MessageResponse, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any) {
      this.list((successData, status, headers, config) => {
          var units = [];
          successData.forEach((x) => {
            if(units.indexOf(x.unit) === -1)
              units.push(x.unit);
          });
          successCallback(units, status, headers, config);
        },
        errorCallback);
    }

    default():Stock {
      return { id: 0, product: null, quantity: 0, unit: "", minQuantity: 0, maxQuantity: 1000 };
    }
  }
}

stock.module.service("StockService", stock.StockServiceImpl);
