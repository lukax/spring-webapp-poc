///<reference path="../../reference.d.ts"/>
import i0 = require("./base/EntityServiceImpl");
import enums = require("./../../util/EnumUtil");

export module service.impl {
    export class OrderServiceImpl extends i0.service.impl.base.EntityServiceImpl<domain.Order> 
        implements d.service.contract.OrderService, d.service.contract.base.HasDefaultValue<domain.Order> {
        
        static $inject = ["$http"];
        constructor($http: ng.IHttpService) {
            super("order", $http, this);
        }

        getDefault(): domain.Order{
            return { id: 0, customer: { id: 0, name: "" }, items: [], payment: { id: 0, quantity: 0, status: enums.PaymentStatus.OK, mode: enums.PaymentMode.MONEY }, date: new Date().getTime() };
        }
        
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("OrderService", service.impl.OrderServiceImpl);
};