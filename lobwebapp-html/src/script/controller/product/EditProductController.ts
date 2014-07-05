///<reference path="../../reference.d.ts"/>
///<amd-dependency path="fileupload"/>

import i0 = require("./../base/AbstractEditEntityController");
import enums = require("./../../util/EnumUtil");

export module controller.product {
    export interface IEditProductController extends i0.controller.base.IEditEntityController<domain.Product> {  
        markUp: number;
        categories: string[];
        imageUrl: string;
    }

    export class EditProductController extends i0.controller.base.AbstractEditEntityController<domain.Product> implements IEditProductController {
        private allCategories: string[] = [];
        markUp: number;
        categories: string[];
        imageUrl: string;

        static $inject = ["$scope", "ProductService", "AlertService", "$filter"];
        constructor(public $scope: d.controller.base.IAppScope,
                    public ProductService: d.service.contract.ProductService,
                    public AlertService: d.service.contract.AlertService,
                    public $filter: ng.IFilterService) {
            super($scope, ProductService, AlertService, "/product", "Produto");

            var productId = this.$scope.navigator.params().productId;

            this.findEntity(productId, ()=> { 
                this.imageUrl = this.ProductService.getImageUrl(this.entity.id);
                this.fetchCategories();
                this.$scope.$watch("vm.entity", (newValue) => {
                    if(newValue == null) return;
                    this.markUp = 100 * this.ProductService.getMarkUp(this.entity);
                    this.filterCategories();
                }, true);
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

        filterCategories(){
            if(this.entity.category != null)
                this.categories = this.$filter("filter")(this.allCategories, this.entity.category);
        }
        
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("EditProductController", controller.product.EditProductController);
};