///<reference path="./../../reference.d.ts"/>
import i0 = require("./base/EntityServiceImpl");

export module service.impl {
    export class StockServiceImpl extends i0.service.impl.base.EntityServiceImpl<domain.Stock> 
        implements d.service.contract.StockService, d.service.contract.base.HasDefaultValue<domain.Stock> {

        static $inject = ["$http"];
        constructor($http: ng.IHttpService) {
            super("stock", $http, this);
        }

        getDefault(): domain.Stock{
            return { id: 0, product: null, quantity: 0, unit: "" };
        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("StockService", service.impl.StockServiceImpl);
};