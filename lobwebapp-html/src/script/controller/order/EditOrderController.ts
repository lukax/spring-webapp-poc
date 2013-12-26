///<reference path="./../../reference.d.ts"/>

import i0 = require("./../base/AbstractEditEntityController");
import enums = require("./../../util/EnumUtil");

export module controller.order {
    export interface EditOrderViewModel extends i0.controller.base.EditEntityViewModel<domain.Order> {
        item: domain.OrderItem;
        customer: domain.Customer;
        exchange: number;
        total: number;
        saveChanges(order: domain.Order): void;
        addItem(item: domain.OrderItem): void;
        removeItem(item: domain.OrderItem): void;
        quickSearchProduct(): void;
        quickSearchCustomer(): void;
        fetchProduct(id: number): void;
        fetchCustomer(id: number): void;
    }

    export class EditOrderController extends i0.controller.base.AbstractEditEntityController<domain.Order> {

        static $inject = ["$scope", "ProductService", "$timeout", "AlertService", "CustomerService", "OrderService"];
        constructor(public $scope: EditOrderViewModel,
                    public ProductService: d.service.contract.ProductService,
                    public $timeout: ng.ITimeoutService,
                    public AlertService: d.service.contract.AlertService,
                    public CustomerService: d.service.contract.CustomerService,
                    public OrderService: d.service.contract.OrderService) {
            super($scope, "order", OrderService, AlertService);
            this.populateScope();
            this.processArgs();
        }

        addItem(item: domain.OrderItem) {
            var exists = this.$scope.entity.items.some((x) => {
                if (x.product.id == item.product.id) {
                    x.quantity += item.quantity;
                    return true;
                }
                return false;
            });
            if (!exists) {
                this.$scope.entity.items.push(this.$scope.item);        
            }
            this.emptyItem();
        }

        removeItem(orderItem: domain.OrderItem) {
            this.$scope.entity.items = _.without(this.$scope.entity.items, orderItem);
        }

        quickSearchCustomer() {
            var preparedUrl = "/order/" + (this.isEntityNew() ? "new" : String(this.$scope.entity.id));
            this.$scope.navigator.navigateTo("/customer/list?redirect=" + preparedUrl);
        }

        quickSearchProduct() {
            var preparedUrl = "/order/" + (this.isEntityNew() ? "new" : String(this.$scope.entity.id));
            this.$scope.navigator.navigateTo("/product/list?redirect=" + preparedUrl);
        }
        
        total() {
            this.$timeout(() => { //TODO: Fix this ugly hack
                var sum: number = 0;
                this.$scope.entity.items.forEach((x) => {
                    sum += x.quantity * x.product.price;
                });
                this.$scope.total = sum;
            }, 100);
        }

        emptyOrder() {
            this.$scope.entity = { id: 0, customer: null, items: [], payment: { id: 0, quantity: 0, status: enums.PaymentStatus.PENDING, mode: enums.PaymentMode.MONEY }, date: new Date() };
        }

        emptyItem() {
            this.$scope.item = {product: { id: 0, name: "", description: "", quantity: 0, price: 0 }, quantity: 0};
        }

        emptyCustomer() {
            this.$scope.customer = { id: 0, name: "" };
        }

        fetchOrder(id: number) {
            this.lock();
            this.OrderService.find(id,
                (successData) => {
                    this.$scope.entity = successData;
                    this.$scope.customer = successData.customer;
                    this.unlock();
                }, (errorData) => {
                    this.AlertService.add({ title: "Buscar Pedido", content: "Não foi possível achar um pedido com o ID informado", type: enums.AlertType.WARNING });
                    super.newEntity();
                });
            
        }

        fetchCustomer(id: number) {
            if(id <= 0) return;
            this.lock();
            this.CustomerService.find(id,
                (successData: domain.Customer) => {
                    this.$scope.customer = successData;
                    this.$scope.entity.customer = successData;
                    this.unlock();
                }, (errorData: domain.util.Error) => {
                    this.AlertService.add({ title: "Buscar Cliente", content: "Não foi possível achar um cliente com o ID informado", type: enums.AlertType.WARNING });
                    this.emptyCustomer();
                    this.unlock();
                });
            
        }

        fetchProduct(id: number) {
            if(id <= 0) return;
            this.lock();
            this.ProductService.find(id,
                (successData: domain.Product) => {
                    this.$scope.item.product = successData;
                    this.unlock();
                }, (errorData: domain.util.Error) => {
                    this.AlertService.add({ title: "Buscar Produto", content: "Não foi possível achar um produto com o ID informado", type: enums.AlertType.WARNING });
                    this.emptyItem();
                    this.unlock();
                });
        }
        
        watchOrder() {
            this.$scope.$watch("payment", (newValue: domain.Order, oldValue: domain.Order) => {
                if (this.$scope.total > 0) {
                    var sum = this.$scope.entity.payment.quantity - this.$scope.total;
                    if (sum > 0) this.$scope.exchange = sum;
                    else this.$scope.exchange = 0;
                } else {
                    this.$scope.exchange = 0;
                }
            });
            this.$scope.$watchCollection("order.items", (newValue: domain.Product[], oldValue: domain.Product[]) => {
                this.total();
            });
        }

        processArgs() {
            var orderId = this.$scope.navigator.params().orderId;
            var customerId = this.$scope.navigator.params().customerId;
            var productId = this.$scope.navigator.params().productId;

            if(orderId > 0) this.fetchOrder(orderId);
            if(customerId > 0) this.fetchProduct(productId);
            if(productId > 0) this.fetchCustomer(customerId);
        }

        populateScope() {
            this.emptyOrder();
            this.emptyCustomer();
            this.emptyItem();

            this.watchOrder();

            this.$scope.saveChanges = (order) => this.saveChanges(order);
            this.$scope.addItem = (item) => this.addItem(item);
            this.$scope.removeItem = (item) => this.removeItem(item);
            this.$scope.quickSearchCustomer = () => this.quickSearchCustomer();
            this.$scope.quickSearchProduct = () => this.quickSearchProduct();
            this.$scope.fetchProduct = (id) => this.fetchProduct(id);
            this.$scope.fetchCustomer = (id) => this.fetchCustomer(id);
        }
    }
}


export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("EditOrderController", controller.order.EditOrderController);
};