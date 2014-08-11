///<reference path="../reference.ts"/>

module order.edit {
  export interface IEditOrderController extends core.IEditEntityController<order.Order> {
    item: order.OrderItem;
    exchange: number;
    total: number;
    addItem(item:order.OrderItem): void;
    removeItem(item:order.OrderItem): void;
    fetchProduct(id:number): void;
    fetchCustomer(id:number): void;
  }

  export class EditOrderController extends core.AbstractEditEntityController<order.Order> implements IEditOrderController {
    item:order.OrderItem;
    exchange:number;
    total:number;

    static $inject = ["$scope", "ProductService", "AlertService", "CustomerService", "OrderService"];
    constructor(public $scope:core.IAppScope,
                public ProductService:product.ProductService,
                public AlertService:core.AlertService,
                public CustomerService:customer.CustomerService,
                public OrderService:order.OrderService,
                public NavigatorService:core.NavigatorService) {
      super($scope, OrderService, AlertService, NavigatorService, "/order", "Pedido");

      var orderId = NavigatorService.params().orderId;
      var customerId = NavigatorService.params().customerId;
      var productId = NavigatorService.params().productId;

      this.findEntity(orderId, () => {
        if (customerId != null) this.fetchCustomer(customerId);
        if (productId != null) this.fetchProduct(productId);
      });
    }

    addItem(item:order.OrderItem) {
      var exists = this.entity.items.some((x) => {
        if (x.product.id == item.product.id) {
          x.quantity += item.quantity;
          return true;
        }
        return false;
      });
      if (!exists) {
        this.entity.items.push(this.item);
      }
      this.removeCurrentItem();
    }

    removeItem(orderItem:order.OrderItem) {
      //this.entity.items = _.without(this.entity.items, orderItem);
    }

    removeCurrentItem() {
      this.item = { product: null, quantity: null };
    }

    fetchCustomer(id:number) {
      this.CustomerService.find(id,
        (successData) => {
          this.entity.customer = successData;
        }, (errorData) => {
          console.log(errorData);
          this.AlertService.addMessageResponse(errorData, "Não foi possível buscar cliente");
          this.entity.customer.id = 0;
        });
    }

    fetchProduct(id:number) {
      this.ProductService.find(id,
        (successData) => {
          if (!this.item) this.removeCurrentItem();
          this.item.product = successData;
        }, (errorData) => {
          console.log(errorData);
          this.AlertService.addMessageResponse(errorData, "Não foi possível buscar produto");
          this.removeCurrentItem();
        });
    }

    onEntityChanged(entity:order.Order) {
      super.onEntityChanged(entity);
      if (entity == null) return;
      this.exchange = this.OrderService.getExchange(entity);
      if (entity.payment.status == order.PaymentStatus.PENDING)
        entity.payment.quantity = 0;
      this.total = this.OrderService.getTotal(entity);
    }
  }
}


order.edit.module.controller("EditOrderController", order.edit.EditOrderController);
