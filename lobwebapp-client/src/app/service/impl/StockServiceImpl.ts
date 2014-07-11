///<reference path="../../reference.ts"/>

module service.impl {
  export class StockServiceImpl extends base.EntityServiceImpl<domain.Stock> implements service.contract.StockService, service.contract.base.HasDefaultValue<domain.Stock> {

    static $inject = ["$http"];
    constructor($http:ng.IHttpService) {
      super("stock", $http, this);
    }

    listUnit(successCallback:(data:string[], status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any, errorCallback:(data:domain.util.MessageResponse, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any) {
      this.list((stocks, status, headers, config) => {
          var units = [];
          stocks.forEach((x) => {
            if(units.indexOf(x) === -1)
              units.push(x);
          });
          successCallback(units, status, headers, config);
        },
        errorCallback);
    }

    getDefault():domain.Stock {
      return { id: 0, product: null, quantity: 0, unit: "", minQuantity: 0, maxQuantity: 1000 };
    }
  }
}
