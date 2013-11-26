///<reference path="./../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");

export module controller.product {
    export interface ListProductViewModel extends d.controller.base.ViewModel {
        products: domain.Product[];
        searchText: string;
        editProduct: (id: number) => void;
        listProduct: () => void;
    }

    export class ListProductController implements d.controller.base.Controller{
        private redirect: string;

        static $inject = ["$scope", "ProductService", "AlertService", "NavigationService"];
        constructor(public $scope: ListProductViewModel,
                    public ProductService: d.service.contract.ProductService,
                    public AlertService: d.service.contract.util.AlertService,
                    public NavigationService:d.service.contract.util.NavigationService) {

            this.processArgs();
            this.populateScope();
        }

        listProduct() {
            this.NavigationService.progress.start();
            this.ProductService.list(
                (successData, successStatus) => {
                    this.$scope.products = successData;
                    this.NavigationService.progress.done();
                    if (this.redirect) this.AlertService.add({ title: "Busca Rápida", content: "Clique em um produto da lista para voltar para a página anterior", type: enums.AlertType.INFO }); 
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ title: "Listar Produtos", content: "Lista de Produtos não pôde ser carregada", type: enums.AlertType.DANGER });
                    console.log(errorData);
                    this.NavigationService.progress.done();
                });
        }

        editProduct(id: number) {
            if (this.redirect) this.NavigationService.navigateTo(this.redirect + "?productId=" + id);
            else this.NavigationService.navigateTo("/product/"+id);
        }

        processArgs() {
            this.$scope.searchText = this.NavigationService.params().search;
            this.redirect = this.NavigationService.params().redirect;
            this.listProduct();
        }

        populateScope() {
            this.$scope.editProduct = (id: number) => this.editProduct(id);
            this.$scope.listProduct = () => this.listProduct();
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("ListProductController", controller.product.ListProductController);
};