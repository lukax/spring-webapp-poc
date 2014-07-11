///<reference path="../../reference.ts"/>

module service.impl {
  export class OrderServiceImpl extends base.EntityServiceImpl<domain.Order> implements service.contract.OrderService, service.contract.base.HasDefaultValue<domain.Order> {

    static $inject = ["$http"];
    constructor($http:ng.IHttpService) {
      super("order", $http, this);
    }

    getExchange(order:domain.Order) {
      return order.payment.quantity - this.getTotal(order);
    }

    getTotal(order:domain.Order) {
      var sum = 0;
      order.items.forEach((x) => {
        sum += x.quantity * x.product.price;
      });
      return sum;
    }

    getDefault():domain.Order {
      return { id: 0, customer: { id: 0, name: "" }, items: [], payment: { id: 0, quantity: 0, status: util.PaymentStatus.OK, mode: util.PaymentMode.MONEY }, date: new Date().getTime() };
    }

  }
}
