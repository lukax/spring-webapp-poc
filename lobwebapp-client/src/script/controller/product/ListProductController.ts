///<reference path="../../reference.d.ts"/>
import enumUtil = require("./../../util/EnumUtil");
import abstractListEntity = require("./../base/AbstractListEntityController");

export interface IListProductController extends abstractListEntity.IListEntityController<domain.Product> {
    listProduct(page: number): void;
}

export class ListProductController extends abstractListEntity.AbstractListEntityController<domain.Product> implements IListProductController {
    static $inject = ["$scope", "ProductService", "AlertService"];
    constructor(public $scope: controller.base.IAppScope,
        public ProductService: service.contract.ProductService,
        public AlertService: service.contract.AlertService) {
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
                    this.page = { index: pageIndex, size: Number(headers(enumUtil.Headers.PAGE_TOTAL)) };
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
