///<reference path="../../reference.d.ts"/>
///<amd-dependency path="fileupload"/>

import i0 = require("./../base/AbstractEditEntityController");
import enums = require("./../../util/EnumUtil");

export module controller.product {
    export interface EditProductViewModel extends i0.controller.base.EditEntityViewModel<domain.Product> {  
        profitMargin: number;
        categories: string[];
        saveChanges(product: domain.Product): void;
        removeProduct(product: domain.Product): void;
        canSave: boolean;
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

            var routeProdId = this.$scope.navigator.params().productId;
            this.findEntity(routeProdId || 0, ()=> { this.populateScope(); });
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
                    this.AlertService.add({ title: "Carregar categorias", content: errorData.message, type: enums.AlertType.DANGER });
                    this.unlock();
                });
        }
        
        watchProduct() {
            this.$scope.$watch("entity.price + entity.costPrice", () => {
                if (this.$scope.entity.costPrice != 0)
                    this.$scope.profitMargin = this.$scope.entity.price / this.$scope.entity.costPrice;
            });
            this.$scope.$watch("entity.category", (newValue: string, oldValue: string) => {
                this.$scope.categories = this.$filter("filter")(this.allCategories, this.$scope.entity.category);
            });
            this.$scope.$watch("entity.id", (newValue: number, oldValue: number) => {
                this.$scope.imageUrl = "/api/product/"+newValue+"/image";
            });
        }

        populateScope() {
            this.watchProduct();
            this.fetchCategories();
            this.$scope.saveChanges = (entity) => this.saveChanges(entity);
            this.$scope.removeProduct = (entity) => this.removeEntity(entity);
        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("EditProductController", controller.product.EditProductController);
};