///<reference path="../../reference.d.ts"/>
///<amd-dependency path="fileupload"/>

import i0 = require("./../base/AbstractEditEntityController");
import enums = require("./../../util/EnumUtil");

export module controller.product {
    export interface EditProductViewModel extends i0.controller.base.EditEntityViewModel<domain.Product> {  
        markUp: number;
        categories: string[];
        imageUrl: string;
    }

    export class EditProductController extends i0.controller.base.AbstractEditEntityController<domain.Product> {
        allCategories: string[] = [];

        static $inject = ["$scope", "ProductService", "AlertService", "$filter"];
        constructor(public $scope: EditProductViewModel,
                    public ProductService: d.service.contract.ProductService,
                    public AlertService: d.service.contract.AlertService,
                    public $filter: ng.IFilterService) {
            super($scope, ProductService, AlertService, "/product");
            super.setEntityName("Produto");

            var productId = this.$scope.navigator.params().productId;
            
            this.findEntity(productId, ()=> { 
                this.populateScope(); 
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
            this.$scope.$watch("entity.category", () => {
                this.filterCategories();
            });
        }

        filterCategories(){
            if(this.$scope.entity.category != null)
                this.$scope.categories = this.$filter("filter")(this.allCategories, this.$scope.entity.category);
        }

        syncMarkup(){
            this.$scope.$watch("entity.price + entity.costPrice", () => {
                this.$scope.markUp = 100 * this.ProductService.getMarkUp(this.$scope.entity);
            });
        }
        
        populateScope() {
            this.$scope.imageUrl = this.ProductService.getImageUrl(this.$scope.entity.id);
            this.fetchCategories();
            this.syncMarkup();
        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("EditProductController", controller.product.EditProductController);
};