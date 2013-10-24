///<reference path="./../../reference.d.ts"/>

export module controller.product {
    export interface ListProductViewModel extends d.controller.base.BaseViewModel {
        product: domain.Product;
        products: domain.Product[];
        searchText: string;
        editProduct: (id: number) => void;
    }

    export class ListProductController implements d.controller.base.Controller{

        static $inject = ['$scope', 'NavigationService', 'ProductService', 'AlertService'];
        constructor(public $scope: ListProductViewModel,
                    public NavigationSvc: d.service.contract.util.NavigationService,
                    public ProductService: d.service.contract.ProductService,
                    public AlertService: d.service.contract.util.AlertService) {

            this.processArgs();
            this.populateScope();
        }

        listProduct() {
            this.ProductService.list(
                (successData, successStatus) => {
                    this.$scope.products = successData;
                },
                (errorData, errorStatus) => {
                    this.AlertService.add('Lista de Produtos não pode ser carregada', String(errorData), 'danger');
                });
        }

        editProduct(id: number){
            this.NavigationSvc.navigateTo('/product/'+id);
        }

        processArgs() {
            var searchText = this.NavigationSvc.urlParams.search;
            if(searchText) {
                this.$scope.searchText = searchText;
            }
            this.listProduct();
        }

        populateScope() {
            this.$scope.editProduct = (id: number) => this.editProduct(id);
        }

    }
}

(<any>angular.module('lwa.controller')).lazy.controller('ListProductController', controller.product.ListProductController);