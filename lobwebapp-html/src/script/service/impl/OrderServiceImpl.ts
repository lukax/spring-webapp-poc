///<reference path="./../../reference.d.ts"/>
import i0 = require("./base/EntityServiceImpl");

export module service.impl {
    export class OrderServiceImpl extends i0.service.impl.base.EntityServiceImpl<domain.Order> implements d.service.contract.OrderService {
        
        static $inject = ["$http"];
        constructor($http: ng.IHttpService) {
            super("order", $http);
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("OrderService", service.impl.OrderServiceImpl);
};