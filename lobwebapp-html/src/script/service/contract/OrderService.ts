///<reference path="../../reference.d.ts"/>

module service.contract {
    export interface OrderService extends base.EntityService<domain.Order> {
    	getExchange(order: domain.Order): number;
    	getTotal(order: domain.Order): number;
    }
}