///<reference path="../../reference.ts"/>

module controller.order {
  export interface IEditOrderController extends controller.base.IEditEntityController<domain.Order> {
    item: domain.OrderItem;
    exchange: number;
    total: number;
    addItem(item:domain.OrderItem): void;
    removeItem(item:domain.OrderItem): void;
    fetchProduct(id:number): void;
    fetchCustomer(id:number): void;
  }

  export class EditOrderController extends controller.base.AbstractEditEntityController<domain.Order> implements IEditOrderController {
    item:domain.OrderItem;
    exchange:number;
    total:number;

    static $inject = ["$scope", "ProductService", "AlertService", "CustomerService", "OrderService"];
    constructor(public $scope:controller.base.IAppScope,
                public ProductService:service.contract.ProductService,
                public AlertService:service.contract.AlertService,
                public CustomerService:service.contract.CustomerService,
                public OrderService:service.contract.OrderService) {
      super($scope, OrderService, AlertService, "/order", "Pedido");

      var orderId = this.$scope.navigator.params().orderId;
      var customerId = this.$scope.navigator.params().customerId;
      var productId = this.$scope.navigator.params().productId;

      this.findEntity(orderId, () => {
        if (customerId != null) this.fetchCustomer(customerId);
        if (productId != null) this.fetchProduct(productId);
      });
    }

    addItem(item:domain.OrderItem) {
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

    removeItem(orderItem:domain.OrderItem) {
      this.entity.items.forEach((x, i) => {
        if (x == orderItem)
          this.entity.items.splice(i, 1);
      });
    }

    removeCurrentItem() {
      this.item = { product: null, quantity: null };
    }

    fetchCustomer(id:number) {
      this.lock();
      this.CustomerService.find(id,
        (successData) => {
          this.entity.customer = successData;
          this.unlock();
        }, (errorData) => {
          console.log(errorData);
          this.AlertService.addMessageResponse(errorData, "Não foi possível buscar cliente");
          this.entity.customer.id = 0;
          this.unlock();
        });
    }

    fetchProduct(id:number) {
      this.lock();
      this.ProductService.find(id,
        (successData) => {
          if (!this.item) this.removeCurrentItem();
          this.item.product = successData;
          this.unlock();
        }, (errorData) => {
          console.log(errorData);
          this.AlertService.addMessageResponse(errorData, "Não foi possível buscar produto");
          this.removeCurrentItem();
          this.unlock();
        });
    }

    onEntityChanged(entity:domain.Order) {
      super.onEntityChanged(entity);
      if (entity == null) return;
      this.exchange = this.OrderService.getExchange(entity);
      if (entity.payment.status == util.PaymentStatus.PENDING)
        entity.payment.quantity = 0;
      this.total = this.OrderService.getTotal(entity);
    }
  }
}

ControllerModule.controller("EditOrderController", controller.order.EditOrderController);