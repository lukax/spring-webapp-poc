///<reference path="../reference.ts"/>

module stock {
  export interface StockService extends core.EntityService<Stock> {

    listUnit(
      successCallback:(data:string[], status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any,
      errorCallback:(data:core.MessageResponse, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any): void;
  }
}
