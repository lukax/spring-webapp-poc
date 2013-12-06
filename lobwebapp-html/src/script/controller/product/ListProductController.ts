///<reference path="./../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");

export module controller.product {
    export interface ListProductViewModel extends d.controller.base.ViewModel {
        products: domain.Product[];
        searchText: string;
        editProduct(id: number): void;
        listProduct(page: number, searchText: string): void;
        searchProduct(name: string): void;
        currentPage: number;
        totalPages: number;
    }

    export class ListProductController implements d.controller.base.Controller{
        private redirectString: string;
        private defaultPageSize: number = 50;

        static $inject = ["$scope", "ProductService", "AlertService", "NavigationService"];
        constructor(public $scope: ListProductViewModel,
                    public ProductService: d.service.contract.ProductService,
                    public AlertService: d.service.contract.util.AlertService,
                    public NavigationService:d.service.contract.util.NavigationService) {

            this.populateScope();
        }

        listProduct(page: number, searchText: string) {
            this.$scope.currentPage = page;
            this.NavigationService.progress.start();
            if (searchText == "" || searchText == null) {
                this.ProductService.list(
                    (successData, successStatus, headers) => {
                        this.$scope.totalPages = Number(headers("page_total"));
                        this.$scope.products = successData;
                        this.NavigationService.progress.done();
                        if (this.redirectString) this.AlertService.add({ title: "Busca Rápida", content: "Clique em um produto da lista para voltar para a página anterior", type: enums.AlertType.INFO });
                    },
                    (errorData, errorStatus) => {
                        this.AlertService.add({ title: "Listar Produtos", content: "Lista de Produtos não pôde ser carregada", type: enums.AlertType.DANGER });
                        console.log(errorData);
                        this.NavigationService.progress.done();
                    },
                    { page_index: page, page_size: this.defaultPageSize });
            } else {
                this.ProductService.findByName(searchText,
                    (successData, successStatus, headers) => {
                        this.$scope.totalPages = Number(headers("page_total"));
                        this.$scope.products = successData;
                        this.NavigationService.progress.done();
                    },
                    (errorData, errorStatus) => {
                        this.AlertService.add({ title: "Listar Produtos", content: "Lista de Produtos não pôde ser carregada", type: enums.AlertType.DANGER });
                        console.log(errorData);
                        this.NavigationService.progress.done();
                    },
                    { page_index: page, page_size: this.defaultPageSize });
            }
        }

        editProduct(id: number) {
            if (this.redirectString) this.NavigationService.navigateTo(this.redirectString + "?productId=" + id);
            else this.NavigationService.navigateTo("/product/"+id);
        }

        processArgs() {
            this.$scope.searchText = this.NavigationService.params().search;
            this.redirectString = this.NavigationService.params().redirect;
            this.listProduct(0, "");
        }

        populateScope() {
            this.$scope.totalPages = 1;
            this.$scope.editProduct = (id) => this.editProduct(id);
            this.$scope.listProduct = (page, searchName) => this.listProduct(page, searchName);
            this.processArgs();
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("ListProductController", controller.product.ListProductController);
};