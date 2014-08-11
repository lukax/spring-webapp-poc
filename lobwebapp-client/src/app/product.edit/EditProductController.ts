///<reference path="../reference.ts"/>

module product.edit {
  export interface IEditProductController extends core.IEditEntityController<product.Product> {
    markUp: number;
    categories: string[];
    imageUrl: string;
  }

  export class EditProductController extends core.AbstractEditEntityController<product.Product> implements IEditProductController {
    private allCategories:string[] = [];
    markUp:number;
    categories:string[];
    imageUrl:string;

    static $inject = ["$scope", "ProductService", "AlertService", "NavigatorService", "$filter"];
    constructor(public $scope:core.IAppScope,
                public ProductService:product.ProductService,
                public AlertService:core.AlertService,
                public NavigatorService:core.NavigatorService,
                public $filter:ng.IFilterService) {
      super($scope, ProductService, AlertService, NavigatorService, "/product", "Produto");

      var productId = NavigatorService.params().productId;

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

    onEntityChanged(entity:product.Product) {
      super.onEntityChanged(entity);
      if (entity == null) return;
      this.markUp = 100 * this.ProductService.getMarkUp(entity);
      this.filterCategories();
    }
  }
}

product.edit.module.controller("EditProductController", product.edit.EditProductController);
