///<reference path="../reference.ts"/>

module order {
  export interface OrderService extends core.EntityService<Order> {
    getExchange(order:Order): number;
    getTotal(order:Order): number;
  }
}
