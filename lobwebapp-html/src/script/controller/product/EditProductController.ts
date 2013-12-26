///<reference path="./../../reference.d.ts"/>

import i0 = require("./../base/AbstractEditEntityController");
import enums = require("./../../util/EnumUtil");

export module controller.product {
    export interface EditProductViewModel extends i0.controller.base.EditEntityViewModel<domain.Product> {  
        profitMargin: number;
        categories: string[];
        saveChanges(product: domain.Product): void;
        removeProduct(product: domain.Product): void;
        canSave: boolean;
    }

    export class EditProductController extends i0.controller.base.AbstractEditEntityController<domain.Product> {
        allCategories: string[];

        static $inject = ["$scope", "ProductService", "AlertService", "$filter"];
        constructor(public $scope: EditProductViewModel,
                    public ProductService: d.service.contract.ProductService,
                    public AlertService: d.service.contract.AlertService,
                    public $filter: ng.IFilterService) {
            super($scope, "product", ProductService, AlertService);
            this.populateScope();
            this.processArgs();
        }

        fetchProduct(id: number) {
            this.lock();
            this.ProductService.find(id,
                (successData, successStatus) => {
                    this.$scope.entity = successData;
                    this.unlock();
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ title: "Buscar Produto", content: "Erro produto com o ID especificado não foi encontrado", type: enums.AlertType.WARNING });
                    console.log(errorData);
                    this.newEntity();
                });
        }

        emptyProduct() {
            this.$scope.entity = { id: 0, name: "", description: "", price: 0, costPrice: 0, category: "", ncm: "" };
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
            
        }

        processArgs() {
            var routeProdId = this.$scope.navigator.params().productId;
            if (routeProdId > 0) {
                this.fetchProduct(Number(routeProdId));
            } else if (routeProdId == 0 || routeProdId == "new") {
                
            } else {
                this.AlertService.add({ content: "Produto ID Inválido", type: "warning" });
                this.newEntity();
            }
        }

        populateScope() {
            this.emptyProduct();

            this.processArgs();
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