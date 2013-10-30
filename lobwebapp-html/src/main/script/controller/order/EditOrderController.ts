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
        addProduct: (product: domain.Product) => void;
        removeProduct: (id: number) => void;
        lookupProduct: () => void;
    }

    export class EditOrderController implements d.controller.base.Controller{

        static $inject = ["$scope", "ProductService","$timeout"];
        constructor(public $scope: EditOrderViewModel, public ProductService: d.service.contract.ProductService, public $timeout: ng.ITimeoutService){
            this.processArgs();
            this.populateScope();
        }

        addProduct(product: domain.Product) {
            var exists = false;
            this.$scope.order.products.some((x: domain.Product) => {
                if (x.id == product.id) {
                    x.quantity += product.quantity;
                    exists = true;
                    return true;
                }
            });
            if (!exists){
	            this.ProductService.findById(product.id, 
	                (successData: domain.Product) => {
	                    successData.quantity = product.quantity;
	                    this.$scope.order.products.push(successData);
	                }, (errorData) => { });
        	}
    	}

        removeProduct(id: number){
        	this.$scope.order.products.some((x: domain.Product, index: number)=> {
        			if(x.id == id){
        				this.$scope.order.products.splice(index, 1);
        				return true;
        			}
        		});
        }

        lookupProduct() {
            var preparedUrl = "/order/" + (this.isNewOrder() ? "new" : String(this.$scope.order.id));
            this.$scope.navigator.navigateTo("/product/list?redirect=" + preparedUrl);
        }

        total(){
            this.$timeout(() => {
                var sum: number = 0;
                this.$scope.order.products.forEach((x: domain.Product) => {
                    sum += x.quantity * x.price;
                });
                this.$scope.total = sum;
            },300);
        }

        isNewOrder() {
            return (this.$scope.order.id == 0);
        }

        processArgs(){
            this.$scope.productId = this.$scope.navigator.urlParams.productId;
            this.$scope.clientId = this.$scope.navigator.urlParams.clientId;
        }

        populateScope(){
            this.$scope.$watch("order", (newValue: domain.Order, oldValue: domain.Order) => {
                console.log("Object order changed");
                this.$scope.isNewOrder = this.isNewOrder();
            });
            this.$scope.$watch("order.products", (newValue: domain.Product[], oldValue: domain.Product[]) => {
                console.log("Object order.products changed");
                this.total();
            }, true);
            this.$scope.order = {id: 0, client: "", products: [], status: []};      
            this.$scope.addProduct = (product: domain.Product) => this.addProduct(product);
            this.$scope.removeProduct = (index: number) => this.removeProduct(index);
            this.$scope.lookupProduct = () => this.lookupProduct();
        }
    }
}

(<any>angular.module("lwa.controller")).lazy.controller("EditOrderController", controller.order.EditOrderController);