/**
 * Created by lucas on 10/25/13.
 */
///<reference path="./../../reference.d.ts"/>

export module controller.order{
    interface Status{ content: string; type: string; }
    export interface EditOrderViewModel extends d.controller.base.ViewModel{
        order: domain.Order;
        isNewOrder: boolean;
        total: number;
        currProdId: number;
        currProdQuantity: number;
        addProduct: () => void;
        removeProduct: (index: number) => void;
    }

    export class EditOrderController implements d.controller.base.Controller{

        static $inject = ['$scope', 'ProductService'];
        constructor(public $scope: EditOrderViewModel, public ProductService: d.service.contract.ProductService){
            this.processArgs();
            this.populateScope();
        }

        addProduct(){
            this.ProductService.findById(this.$scope.currProdId, 
                (successData: domain.Product) => {
                    var product = successData; 
                    product.quantity = this.$scope.currProdQuantity;
                    this.$scope.order.products.push(product);
                }, (errorData) => {});
        }

        removeProduct(index: number){
            this.$scope.order.products.splice(index, 1);
        }

        total(){
            var sum: number = 0;
            this.$scope.order.products.forEach((x: domain.Product)=> {
                sum += x.quantity * x.price ;
            });
            return sum;
        }

        isNewOrder() {
            return (this.$scope.order.id == 0);
        }

        processArgs(){

        }

        populateScope(){
            this.$scope.$watch('order', (newValue: domain.Product, oldValue: domain.Product) => {
                    console.log('EditOrderController: order object changed');
                    this.$scope.isNewOrder = this.isNewOrder();
                    this.$scope.total = this.total();
                });
            this.$scope.order = {id: 0, client: '', products: [], status: []};
            this.$scope.order.products.push({ id: 1, name: 'Notebook', description: 'Dell Inspiron 15R Special Edition Intel Core i5-3230M 2.6 GHz 6144 MB 750 GB', quantity: 2, costPrice: 2102.30, price: 2699.00, group: 'Informática/Dispositivos', date: new Date(12,12,12)});
            
            this.$scope.addProduct = () => this.addProduct();
            this.$scope.removeProduct = (index: number) => this.removeProduct(index);
        }
    }
}

(<any>angular.module('lwa.controller')).lazy.controller('EditOrderController', controller.order.EditOrderController);