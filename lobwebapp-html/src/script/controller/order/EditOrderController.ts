///<reference path="../../reference.d.ts"/>

import i0 = require("./../base/AbstractEditEntityController");
import enums = require("./../../util/EnumUtil");

export module controller.order {
    export interface EditOrderViewModel extends i0.controller.base.EditEntityViewModel<domain.Order> {
        item: domain.OrderItem;
        exchange: number;
        total: number;
        saveChanges(order: domain.Order): void;
        addItem(item: domain.OrderItem): void;
        removeItem(item: domain.OrderItem): void;
        fetchProduct(id: number): void;
        fetchCustomer(id: number): void;
        invalid: any;
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
            
            var orderId = this.$scope.navigator.params().orderId;
            var customerId = this.$scope.navigator.params().customerId;
            var productId = this.$scope.navigator.params().productId;

            this.findEntity(orderId, () => { 
                if(customerId != null) this.fetchCustomer(customerId);
                this.fetchProduct(productId || 0);
                this.computeTotal();
                this.watchOrder();
                this.populateScope(); 
                this.setupValidation();
            });
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
            this.computeTotal();
        }
        
        emptyItem(){
            this.$scope.item = { product: null, quantity: 0 };
        }

        removeItem(orderItem: domain.OrderItem) {
            this.$scope.entity.items = _.without(this.$scope.entity.items, orderItem);
        }
        
        computeTotal() {
            var sum = 0;
            this.$scope.entity.items.forEach((x) => {
                sum += x.quantity * x.product.price;
            });
            this.$scope.total = sum;
        }

        fetchCustomer(id: number) {
            this.lock();
            this.CustomerService.find(id,
                (successData) => {
                    this.$scope.entity.customer = successData;
                    this.unlock();
                }, (errorData) => {
                    console.log(errorData);
                    this.AlertService.add({ title: "Não foi possível buscar cliente", content: errorData.message, type: enums.AlertType.WARNING });
                    this.$scope.entity.customer.id = 0;
                    this.unlock();
                });
            
        }

        fetchProduct(id: number) {
            this.lock();
            this.ProductService.find(id,
                (successData) => {
                    if(!this.$scope.item) this.emptyItem();
                    this.$scope.item.product = successData;
                    this.unlock();
                }, (errorData) => {
                    console.log(errorData);
                    this.AlertService.add({ title: "Não foi possível buscar produto", content: errorData.message, type: enums.AlertType.WARNING });
                    this.emptyItem();
                    this.unlock();
                });
        }
        
        watchOrder() {
            this.$scope.$watch("entity.payment.quantity", () => {
                this.$scope.exchange = this.$scope.entity.payment.quantity - this.$scope.total;
            });
            this.$scope.$watch("entity.payment.status", () => {
                if(this.$scope.entity.payment.status == enums.PaymentStatus.PENDING)
                    this.$scope.entity.payment.quantity = 0;
            });
        }

        setupValidation() {
            this.$scope.invalid = {};
            this.$scope.$watchCollection("entity.items", ()=>{
                this.$scope.invalid.orderItems = this.$scope.entity.items.length == 0;
            });
            this.$scope.$watch("exchange", () =>{
                this.$scope.invalid.paymentQuantity = this.$scope.entity.payment.status != enums.PaymentStatus.PENDING && this.$scope.exchange < 0;
            });
        }

        populateScope() {
            this.$scope.saveChanges = (order) => this.saveChanges(order);
            this.$scope.addItem = (item) => this.addItem(item);
            this.$scope.removeItem = (item) => this.removeItem(item);
            this.$scope.fetchProduct = (id) => this.fetchProduct(id);
            this.$scope.fetchCustomer = (id) => this.fetchCustomer(id);
        }
    }
}


export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("EditOrderController", controller.order.EditOrderController);
};