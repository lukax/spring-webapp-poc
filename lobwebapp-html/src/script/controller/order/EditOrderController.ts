///<reference path="../../reference.d.ts"/>

import _ = require("underscore");
import i0 = require("./../base/AbstractEditEntityController");
import enums = require("./../../util/EnumUtil");

export module controller.order {
    export interface EditOrderViewModel extends i0.controller.base.EditEntityViewModel<domain.Order> {
        item: domain.OrderItem;
        exchange: number;
        total: number;
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
            super($scope, OrderService, AlertService, "/order");
            super.setEntityName("Pedido");
            
            var orderId = this.$scope.navigator.$stateParams.orderId;
            var customerId = this.$scope.navigator.$stateParams.customerId;
            var productId = this.$scope.navigator.$stateParams.productId;

            this.findEntity(orderId, () => { 
                if(customerId != null) this.fetchCustomer(customerId);
                if(productId != null) this.fetchProduct(productId);
                this.populateScope(); 
                this.setupValidations();
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
            this.removeCurrentItem();
        }

        removeItem(orderItem: domain.OrderItem) {
            this.$scope.entity.items = _.without(this.$scope.entity.items, orderItem);
        }
        
        removeCurrentItem(){
            this.$scope.item = { product: null, quantity: 0 };
        }

        fetchCustomer(id: number) {
            this.lock();
            this.CustomerService.find(id,
                (successData) => {
                    this.$scope.entity.customer = successData;
                    this.unlock();
                }, (errorData) => {
                    console.log(errorData);
                    this.AlertService.addMessageResponse(errorData, "Não foi possível buscar cliente");
                    this.$scope.entity.customer.id = 0;
                    this.unlock();
                });
            
        }

        fetchProduct(id: number) {
            this.lock();
            this.ProductService.find(id,
                (successData) => {
                    if(!this.$scope.item) this.removeCurrentItem();
                    this.$scope.item.product = successData;
                    this.unlock();
                }, (errorData) => {
                    console.log(errorData);
                    this.AlertService.addMessageResponse(errorData, "Não foi possível buscar produto");
                    this.removeCurrentItem();
                    this.unlock();
                });
        }
        
        setupValidations() {
            this.$scope.invalid = {};
            this.$scope.$watchCollection("entity.items", ()=>{
                this.$scope.invalid.orderItems = this.$scope.entity.items.length == 0;
            });
            this.$scope.$watch("entity.payment.status + exchange", () =>{
                this.$scope.invalid.paymentQuantity = (this.$scope.entity.payment.status == enums.PaymentStatus.OK) && 
                    (this.$scope.exchange == null || this.$scope.exchange < 0);
            });
        }

        syncExchange(){
            this.$scope.$watch("entity.payment.quantity", () => {
                this.$scope.exchange = this.OrderService.getExchange(this.$scope.entity);
            });
        }

        syncPaymentQuantity(){
            this.$scope.$watch("entity.payment.status", () => {
                if(this.$scope.entity.payment.status == enums.PaymentStatus.PENDING)
                    this.$scope.entity.payment.quantity = 0;
            });
        }

        syncTotal(){
            this.$scope.$watch("entity.items", ()=>{
                this.$scope.total = this.OrderService.getTotal(this.$scope.entity);
            }, true);
        }

        populateScope() {
            this.$scope.total = 0;
            this.$scope.addItem = (item) => this.addItem(item);
            this.$scope.removeItem = (item) => this.removeItem(item);
            this.$scope.fetchProduct = (id) => this.fetchProduct(id);
            this.$scope.fetchCustomer = (id) => this.fetchCustomer(id);
            this.syncExchange();
            this.syncPaymentQuantity();
            this.syncTotal();
        }
    }
}


export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("EditOrderController", controller.order.EditOrderController);
};