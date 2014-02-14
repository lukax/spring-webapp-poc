///<reference path="../../reference.d.ts"/>
///<amd-dependency path="fileupload"/>

import i0 = require("./../base/AbstractEditEntityController");
import enums = require("./../../util/EnumUtil");

export module controller.product {
    export interface EditProductViewModel extends i0.controller.base.EditEntityViewModel<domain.Product> {  
        markUp: number;
        categories: string[];
        saveChanges(product: domain.Product): void;
        removeProduct(product: domain.Product): void;
        imageUrl: string;
    }

    export class EditProductController extends i0.controller.base.AbstractEditEntityController<domain.Product> {
        allCategories: string[];

        static $inject = ["$scope", "ProductService", "AlertService", "$filter"];
        constructor(public $scope: EditProductViewModel,
                    public ProductService: d.service.contract.ProductService,
                    public AlertService: d.service.contract.AlertService,
                    public $filter: ng.IFilterService) {
            super($scope, "product", ProductService, AlertService);

            var productId = this.$scope.navigator.$stateParams.productId;
            
            this.findEntity(productId, ()=> { 
                this.populateScope(); 
            });
        }
        
        fetchCategories() {
            this.lock();
            this.ProductService.listCategory(
                (successData) => {
                    this.$scope.categories = [];
                    this.allCategories = successData;
                    this.unlock();
                },
                (errorData) => {
                    this.AlertService.add({ title: "Não foi possível carregar categorias", content: errorData.message, type: enums.AlertType.DANGER });
                    this.unlock();
                });
        }

        computeMarkUp(){
            if (this.$scope.entity.costPrice != 0)
                this.$scope.markUp = 100 * (this.$scope.entity.price - this.$scope.entity.costPrice) / this.$scope.entity.costPrice;
        }

        filterCategories(){
            this.$scope.categories = this.$filter("filter")(this.allCategories, this.$scope.entity.category);
        }

        setImageUrl(){
            this.$scope.imageUrl = "/api/product/" + this.$scope.entity.id + "/image";
        }
        
        populateScope() {
            this.$scope.$watch("entity.price + entity.costPrice", () => {
                this.computeMarkUp();
            });
            this.$scope.$watch("entity.category", () => {
                this.filterCategories();
            });
            this.$scope.$watch("entity.id", () => {
                this.setImageUrl();
            });
            this.fetchCategories();
            this.$scope.saveChanges = (entity) => this.saveChanges(entity);
            this.$scope.removeProduct = (entity) => this.removeEntity(entity);
        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("EditProductController", controller.product.EditProductController);
};