///<reference path="../../reference.ts"/>

module controller.product {
  export interface IListProductController extends controller.base.IListEntityController<domain.Product> {
    listProduct(page:number): void;
  }

  export class ListProductController extends controller.base.AbstractListEntityController<domain.Product> implements IListProductController {

    static $inject = ["$scope", "ProductService", "AlertService", "NavigatorService"];
    constructor(public $scope:controller.base.IAppScope,
                public ProductService:service.contract.ProductService,
                public AlertService:service.contract.AlertService,
                public NavigatorService:service.contract.NavigatorService) {
      super($scope, ProductService, AlertService, NavigatorService, "/product", "productId");

      this.listProduct(0);
    }

    listProduct(pageIndex:number) {
      var searchText = this.searchText;
      if (searchText == "") {
        this.listEntity(pageIndex);
      } else {
        this.ProductService.findByName(searchText,
          (successData, successStatus, headers) => {
            this.page = { index: pageIndex, size: Number(headers(util.Headers.PAGE_TOTAL)) };
            this.entities = successData;
            this.NavigatorService.Progress.done();
          },
          (errorData) => {
            console.log(errorData);
            this.AlertService.addMessageResponse(errorData, "Não foi possível listar produtos");
            this.NavigatorService.Progress.done();
          },
          { index: pageIndex, size: this._defaultPageSize });
      }
    }

  }
}

ControllerModule.controller("ListProductController", controller.product.ListProductController);
