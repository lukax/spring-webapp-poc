///<reference path="./../../reference.d.ts"/>

export module controller.product {
    export interface ListProductViewModel extends d.controller.base.BaseViewModel {
        product: domain.Product;
        products: domain.Product[];
        editProduct: (id: number) => void;
        findProduct: (searchText: string) => void;
        gridOptions: any;
    }

    export class ListProductController implements d.controller.base.Controller{

        static $inject = ['$scope', 'NavigationService', 'ProductService', 'AlertService', '$ekathuwa'];
        constructor(public $scope: ListProductViewModel,
                    public NavigationSvc: d.service.contract.util.NavigationService,
                    public ProductService: d.service.contract.ProductService,
                    public AlertService: d.service.contract.util.AlertService,
                    public $ekathuwa: any) {

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

        editProduct(id: number) {
            this.NavigationSvc.$location.url('/product/' + id);
        }

        findProduct(searchText?: string) {
            if (!isNaN(Number(searchText))) { this.NavigationSvc.$location.url('/product/' + searchText); }
            else {
                this.ProductService.findByName(searchText,
                    (successData, successStatus) => {
                        this.NavigationSvc.$location.url('/product/' + successData[0].id);
                    },
                    (errorData, errorStatus) => {
                        this.AlertService.add('Produto com o ID/Nome especificado não foi encontrado', String(errorData), 'danger');
                    });
            }
            if (this.openedFindProductModal) this.openedFindProductModal.then((x: any) => { x.modal('hide'); });
        }

        private openedFindProductModal: any;
        findProductModal(){
            this.openedFindProductModal = this.$ekathuwa.modal({
                id: 'findProductModalId',
                templateURL: 'views/product/modal/findProductModal.html',
                scope: this.$scope,
                onHidden: () => { this.NavigationSvc.$location.search('find', null); this.$scope.$apply(); }
            });
        }

        processArgs() {
            var findParam = this.NavigationSvc.urlParams.find;
            switch (findParam) {
                case true: this.findProduct(findParam);
                case '': this.findProductModal();
                default: this.listProduct();
            }
        }

        populateScope() {
            this.$scope.editProduct = (id: number) => { this.editProduct(id); };
            this.$scope.findProduct = (searchText: string) => { this.findProduct(searchText); }
        }

    }
}

(<any>angular.module('lwa.controller')).lazy.controller('ListProductController', controller.product.ListProductController);