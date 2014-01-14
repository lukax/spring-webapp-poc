///<reference path="./../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");
import i0 = require("./../base/AbstractListEntityController");

export module controller.product {
    export interface ListProductViewModel extends i0.controller.base.ListEntityViewModel<domain.Product> {
        listProduct(page: number): void;
        searchProduct(name: string): void;
    }

    export class ListProductController extends i0.controller.base.AbstractListEntityController<domain.Product> {
        static $inject = ["$scope", "ProductService", "AlertService"];
        constructor(public $scope: ListProductViewModel,
                    public ProductService: d.service.contract.ProductService,
                    public AlertService: d.service.contract.AlertService) {
            super($scope, ProductService, AlertService, "/product/", "productId");
            
            this.listProduct(0);
            this.$scope.listProduct = (page) => this.listProduct(page);
        }

        listProduct(pageIndex: number) {
            var searchText = this.$scope.searchText;
            
            if (searchText == "") {
                this.listEntity(pageIndex);
            } else {
                this.ProductService.findByName(searchText,
                    (successData, successStatus, headers) => {
                        this.$scope.page = { index: pageIndex, size: Number(headers(enums.Headers.PAGE_TOTAL)) };
                        this.$scope.entities = successData;
                        this.$scope.navigator.progress.done();
                    },
                    (errorData, errorStatus) => {
                        this.AlertService.add({ title: "Listar Produtos", content: "Lista de Produtos não pôde ser carregada", type: enums.AlertType.DANGER });
                        console.log(errorData);
                        this.$scope.navigator.progress.done();
                    },
                    { index: pageIndex, size: this.defaultPageSize });
            }
        }
        
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("ListProductController", controller.product.ListProductController);
};