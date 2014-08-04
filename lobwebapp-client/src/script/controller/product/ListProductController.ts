///<reference path="../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");
import i0 = require("./../base/AbstractListEntityController");

export module controller.product {
    export interface IListProductController extends i0.controller.base.IListEntityController<domain.Product>{
        listProduct(page: number): void;
    }

    export class ListProductController extends i0.controller.base.AbstractListEntityController<domain.Product> implements IListProductController{
        static $inject = ["$scope", "ProductService", "AlertService"];
        constructor(public $scope: d.controller.base.IAppScope,
                    public ProductService: d.service.contract.ProductService,
                    public AlertService: d.service.contract.AlertService) {
            super($scope, ProductService, AlertService, "/product", "productId");

            this.listProduct(0);
        }

        listProduct(pageIndex: number) {
            var searchText = this.searchText;
            if (searchText == "") {
                this.listEntity(pageIndex);
            } else {
                this.ProductService.findByName(searchText,
                    (successData, successStatus, headers) => {
                        this.page = { index: pageIndex, size: Number(headers(enums.Headers.PAGE_TOTAL)) };
                        this.entities = successData;
                        this.$scope.navigator.Progress.done();
                    },
                    (errorData) => {
                        console.log(errorData);
                        this.AlertService.addMessageResponse(errorData, "Não foi possível listar produtos");
                        this.$scope.navigator.Progress.done();
                    },
                    { index: pageIndex, size: this._defaultPageSize });
            }
        }

    }
}

export var register = (module: ng.ILazyModule) => {
  module.controller("ListProductController", controller.product.ListProductController);
};
