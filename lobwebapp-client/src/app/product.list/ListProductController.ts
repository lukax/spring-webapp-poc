///<reference path="../reference.ts"/>

module product.list {
    export interface IListProductController extends core.IListEntityController<product.Product>{
        listProduct(page: number): void;
    }

    export class ListProductController extends core.AbstractListEntityController<product.Product> implements IListProductController{
        static $inject = ["$scope", "ProductService", "AlertService"];
        constructor(public $scope: core.IAppScope,
                    public ProductService: product.ProductService,
                    public AlertService: core.AlertService,
                    public NavigatorService: core.NavigatorService) {
            super($scope, ProductService, AlertService, NavigatorService, "/product", "productId");

            this.listProduct(0);
        }

        listProduct(pageIndex: number) {
            var searchText = this.searchText;
            if (searchText == "") {
                this.listEntity(pageIndex);
            } else {
                this.ProductService.findByName(searchText,
                    (successData, successStatus, headers) => {
                        this.page = { index: pageIndex, size: Number(headers(core.Headers.PAGE_TOTAL)) };
                        this.entities = successData;
                    },
                    (errorData) => {
                        console.log(errorData);
                        this.AlertService.addMessageResponse(errorData, "Não foi possível listar produtos");
                    },
                    { index: pageIndex, size: this._defaultPageSize });
            }
        }

    }
}

product.list.module.controller("ListProductController", product.list.ListProductController);
