///<reference path="../../reference.d.ts"/>

import _ = require("underscore");
import i0 = require("./../base/AbstractEditEntityController");
import enums = require("./../../util/EnumUtil");

export module controller.order {
    export interface IEditOrderController extends i0.controller.base.IEditEntityController<domain.Order> {
        item: domain.OrderItem;
        exchange: number;
        total: number;
        addItem(item: domain.OrderItem): void;
        removeItem(item: domain.OrderItem): void;
        fetchProduct(id: number): void;
        fetchCustomer(id: number): void;
    }

    export class EditOrderController extends i0.controller.base.AbstractEditEntityController<domain.Order> implements IEditOrderController {
        item: domain.OrderItem;
        exchange: number;
        total: number;

        static $inject = ["$scope", "ProductService", "AlertService", "CustomerService", "OrderService"];
        constructor(public $scope: d.controller.base.IAppScope,
                    public ProductService: d.service.contract.ProductService,
                    public AlertService: d.service.contract.AlertService,
                    public CustomerService: d.service.contract.CustomerService,
                    public OrderService: d.service.contract.OrderService) {
            super($scope, OrderService, AlertService, "/order", "Pedido");
            
            var orderId = this.$scope.navigator.params().orderId;
            var customerId = this.$scope.navigator.params().customerId;
            var productId = this.$scope.navigator.params().productId;

            this.findEntity(orderId, () => { 
                if(customerId != null) this.fetchCustomer(customerId);
                if(productId != null) this.fetchProduct(productId);
            });

            this.$scope.$watch("vm.entity", () => {
                this.exchange = this.OrderService.getExchange(this.entity);
                if (this.entity.payment.status == enums.PaymentStatus.PENDING)
                    this.entity.payment.quantity = 0;
                this.total = this.OrderService.getTotal(this.entity);
            }, true);
        }

        addItem(item: domain.OrderItem) {
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

        removeItem(orderItem: domain.OrderItem) {
            this.entity.items = _.without(this.entity.items, orderItem);
        }
        
        removeCurrentItem(){
            this.item = { product: null, quantity: 0 };
        }

        fetchCustomer(id: number) {
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

        fetchProduct(id: number) {
            this.lock();
            this.ProductService.find(id,
                (successData) => {
                    if(!this.item) this.removeCurrentItem();
                    this.item.product = successData;
                    this.unlock();
                }, (errorData) => {
                    console.log(errorData);
                    this.AlertService.addMessageResponse(errorData, "Não foi possível buscar produto");
                    this.removeCurrentItem();
                    this.unlock();
                });
        }

    }
}


export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("EditOrderController", controller.order.EditOrderController);
};