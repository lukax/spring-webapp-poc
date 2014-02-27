///<reference path="../../reference.d.ts"/>

module d.service.contract {
    export interface OrderService extends d.service.contract.base.EntityService<domain.Order> {
    	getExchange(order: domain.Order): number;
    	getTotal(order: domain.Order): number;
    }
}