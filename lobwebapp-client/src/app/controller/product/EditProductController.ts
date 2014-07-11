///<reference path="../../reference.ts"/>

module controller.product {
  export interface IEditProductController extends controller.base.IEditEntityController<domain.Product> {
    markUp: number;
    categories: string[];
    imageUrl: string;
  }

  export class EditProductController extends controller.base.AbstractEditEntityController<domain.Product> implements IEditProductController {
    private allCategories:string[] = [];
    markUp:number;
    categories:string[];
    imageUrl:string;

    static $inject = ["$scope", "ProductService", "AlertService", "$filter"];

    constructor(public $scope:controller.base.IAppScope,
                public ProductService:service.contract.ProductService,
                public AlertService:service.contract.AlertService,
                public $filter:ng.IFilterService) {
      super($scope, ProductService, AlertService, "/product", "Produto");

      var productId = this.$scope.navigator.params().productId;

      this.findEntity(String(productId), ()=> {
        this.imageUrl = this.ProductService.getImageUrl(this.entity.id);
        this.fetchCategories();
      });
    }

    fetchCategories() {
      this.ProductService.listCategory(
        (successData) => {
          this.allCategories = successData;
        },
        (errorData) => {
          console.log(errorData);
          this.AlertService.addMessageResponse(errorData, "Não foi possível carregar as categorias");
        });
    }

    filterCategories() {
      if (this.entity.category != null)
        this.categories = this.$filter("filter")(this.allCategories, this.entity.category);
    }

    onEntityChanged(entity:domain.Product) {
      super.onEntityChanged(entity);
      if (entity == null) return;
      this.markUp = 100 * this.ProductService.getMarkUp(entity);
      this.filterCategories();
    }
  }
}

ControllerModule.controller("EditProductController", controller.product.EditProductController);
