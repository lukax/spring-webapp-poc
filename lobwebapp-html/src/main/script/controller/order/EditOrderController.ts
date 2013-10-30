///<reference path="./../../reference.d.ts"/>

import Enumerable = require("linqjs");

export module controller.order{
    interface Status{ content: string; type: string; }
    export interface EditOrderViewModel extends d.controller.base.ViewModel{
        clientId: number;
        productId: number;
        productQuantity: number;
        order: domain.Order;
        isNewOrder: boolean;
        total: number;
        addProduct: () => void;
        removeProduct: (index: number) => void;
        findProduct: () => void;
    }

    export class EditOrderController implements d.controller.base.Controller{

        static $inject = ["$scope", "ProductService","$timeout"];
        constructor(public $scope: EditOrderViewModel, public ProductService: d.service.contract.ProductService, public $timeout: ng.ITimeoutService){
            this.processArgs();
            this.populateScope();
        }

        addProduct() {
            var exists = false;
            this.$scope.order.products.some((x: domain.Product) => {
                if (x.id == this.$scope.productId) {
                    x.quantity += this.$scope.productQuantity;
                    exists = true;
                    return true;
                }
                });
            if (exists) return;

            this.ProductService.findById(this.$scope.productId, 
                (successData: domain.Product) => {
                    successData.quantity = this.$scope.productQuantity;
                    this.$scope.order.products.push(successData);
                }, (errorData) => { });
        }

        removeProduct(index: number){
            this.$scope.order.products.splice(index, 1);
        }

        total(){
            this.$timeout(() => {
                var sum: number = 0;
                this.$scope.order.products.forEach((x: domain.Product) => {
                    sum += x.quantity * x.price;
                });
                this.$scope.total = sum;
            },500);
        }

        isNewOrder() {
            return (this.$scope.order.id == 0);
        }

        findProduct() {
            var preparedUrl = "/order/" + (this.isNewOrder() ? "new" : String(this.$scope.order.id));
            this.$scope.navigator.navigateTo("/product/list?redirect=" + preparedUrl);
        }

        processArgs(){
            this.$scope.productId = this.$scope.navigator.urlParams.productId;
            this.$scope.clientId = this.$scope.navigator.urlParams.clientId;
        }

        populateScope(){
            this.$scope.$watch("order", (newValue: domain.Order, oldValue: domain.Order) => {
                this.$scope.isNewOrder = this.isNewOrder();
            });
            this.$scope.$watch("order.products", (newValue: domain.Product[], oldValue: domain.Product[]) => {
                console.log("order.products mudou");
                this.total();
            }, true);
            this.$scope.order = {id: 0, client: "", products: [], status: []};      
            this.$scope.addProduct = () => this.addProduct();
            this.$scope.removeProduct = (index: number) => this.removeProduct(index);
            this.$scope.findProduct = () => this.findProduct();
        }
    }
}

(<any>angular.module("lwa.controller")).lazy.controller("EditOrderController", controller.order.EditOrderController);