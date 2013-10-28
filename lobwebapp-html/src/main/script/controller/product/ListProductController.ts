///<reference path="./../../reference.d.ts"/>

export module controller.product {
    export interface ListProductViewModel extends d.controller.base.ViewModel {
        product: domain.Product;
        products: domain.Product[];
        searchText: string;
        editProduct: (id: number) => void;
        listProduct: () => void;
    }

    export class ListProductController implements d.controller.base.Controller{

        static $inject = ['$scope', 'ProductService', 'AlertService'];
        constructor(public $scope: ListProductViewModel,
                    public ProductService: d.service.contract.ProductService,
                    public AlertService: d.service.contract.util.AlertService) {

            this.processArgs();
            this.populateScope();
        }

        listProduct() {
            this.$scope.navigator.progress.start();
            this.ProductService.list(
                (successData, successStatus) => {
                    this.$scope.products = successData;
                    this.$scope.navigator.progress.done();  
                },
                (errorData, errorStatus) => {
                    this.AlertService.add('Lista de Produtos não pôde ser carregada', String(errorData), 'danger');
                    this.$scope.navigator.progress.done();  
                });
        }

        editProduct(id: number){
            this.$scope.navigator.navigateTo('/product/'+id);
        }

        processArgs() {
            var searchText = this.$scope.navigator.urlParams.search;
            if(searchText) this.$scope.searchText = searchText;
            this.listProduct();
        }

        populateScope() {
            this.$scope.editProduct = (id: number) => this.editProduct(id);
            this.$scope.listProduct = () => this.listProduct();
        }

    }
}

(<any>angular.module('lwa.controller')).lazy.controller('ListProductController', controller.product.ListProductController);