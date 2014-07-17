///<reference path="../../../reference.ts"/>

module product.edit {
  export interface IEditProductController extends entity.IEditEntityController<product.core.Product> {
    markUp: number;
    categories: string[];
    imageUrl: string;
  }

  export class EditProductController extends entity.AbstractEditEntityController<product.core.Product> implements IEditProductController {
    private allCategories:string[] = [];
    markUp:number;
    categories:string[];
    imageUrl:string;

    static $inject = ["$scope", "ProductService", "AlertService", "NavigatorService", "$filter"];
    constructor(public $scope:entity.IAppScope,
                public ProductService:product.core.ProductService,
                public AlertService:entity.AlertService,
                public NavigatorService:entity.NavigatorService,
                public $filter:ng.IFilterService) {
      super($scope, ProductService, AlertService, NavigatorService, "/product", "Produto");

      var productId = this.NavigatorService.params().productId;

      this.findEntity(productId, ()=> {
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

    onEntityChanged(entity:product.core.Product) {
      super.onEntityChanged(entity);
      if (entity == null) return;
      this.markUp = 100 * this.ProductService.getMarkUp(entity);
      this.filterCategories();
    }
  }
}

angular.module("lwa.product.edit").controller("EditProductController", product.edit.EditProductController);
