///<reference path="../reference.ts"/>

module order {
  export class OrderServiceImpl extends core.EntityServiceImpl<Order> implements OrderService {

    static $inject = ["$http"];
    constructor($http:ng.IHttpService) {
      super($http, "order");
    }

    getExchange(order:Order) {
      return order.payment.quantity - this.getTotal(order);
    }

    getTotal(order:Order) {
      var sum = 0;
      order.items.forEach((x) => {
        sum += x.quantity * x.product.price;
      });
      return sum;
    }

    default():Order {
      return { id: 0, customer: { id: 0, name: "" }, items: [], payment: { id: 0, quantity: 0, status: PaymentStatus.OK, mode: PaymentMode.MONEY }, date: new Date().getTime() };
    }

  }
}

order.module.service("OrderService", order.OrderServiceImpl);
