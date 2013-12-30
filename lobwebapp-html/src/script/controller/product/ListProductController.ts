///<reference path="./../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");
import i0 = require("./../base/AbstractListEntityController");

export module controller.product {
    export interface ListProductViewModel extends i0.controller.base.ListEntityViewModel<domain.Product> {
        listProduct(page: number, searchText: string): void;
        searchProduct(name: string): void;
    }

    export class ListProductController extends i0.controller.base.AbstractListEntityController<domain.Product> {
        static $inject = ["$scope", "ProductService", "AlertService"];
        constructor(public $scope: ListProductViewModel,
                    public ProductService: d.service.contract.ProductService,
                    public AlertService: d.service.contract.AlertService) {
            super($scope, ProductService, AlertService, "/product/", "productId");
            
            this.listProduct(0, "");
            this.$scope.listProduct = (page, searchName) => this.listProduct(page, searchName);
        }

        listProduct(page: number, searchText: string) {
            if (searchText == "") {
                this.listEntity(page);
            } else {
                this.ProductService.findByName(searchText,
                    (successData, successStatus, headers) => {
                        this.$scope.totalPages = Number(headers("page_total"));
                        this.$scope.entities = successData;
                        this.$scope.navigator.progress.done();
                    },
                    (errorData, errorStatus) => {
                        this.AlertService.add({ title: "Listar Produtos", content: "Lista de Produtos não pôde ser carregada", type: enums.AlertType.DANGER });
                        console.log(errorData);
                        this.$scope.navigator.progress.done();
                    },
                    { page_index: page, page_size: this.defaultPageSize });
            }
        }
        
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("ListProductController", controller.product.ListProductController);
};