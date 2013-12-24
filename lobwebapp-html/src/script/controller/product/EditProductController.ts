///<reference path="./../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");

export module controller.product {
    export interface EditProductViewModel extends d.controller.base.ViewModel {
        product: domain.Product;
        profitMargin: number;
        categories: string[];
        isProductNew: boolean;
        saveChanges(product: domain.Product): void;
        removeProduct(product: domain.Product): void;
    }

    export class EditProductController implements d.controller.base.Controller {
        allCategories: string[];

        static $inject = ["$scope", "ProductService", "AlertService", "$filter"];
        constructor(public $scope: EditProductViewModel,
            public ProductService: d.service.contract.ProductService,
            public AlertService: d.service.contract.AlertService,
            public $filter: ng.IFilterService) {

            this.populateScope();
        }

        saveChanges(product: domain.Product) {
            if (this.$scope.product.id == 0) this.saveProduct(product);
            else this.updateProduct(product);
        }

        saveProduct(product: domain.Product) {
            this.ProductService.save(product,
                (successData: domain.Product, successStatus) => {
                    this.AlertService.add({ title: "Novo Produto", content: product.name + " foi adicionado" });
                    this.$scope.navigator.$location.url("/product/" + String(successData.id));
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ title: "Novo Produto", content: "Erro produto não pôde ser salvado", type: enums.AlertType.DANGER });
                    console.log(errorData);
                });
        }

        updateProduct(product: domain.Product) {
            this.ProductService.update(product,
                (successData, successStatus) => {
                    this.AlertService.add({ title: "Atualizar Produto", content: "Alterações em " + product.name + " foram bem sucedidas" });
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ title: "Atualizar Produto", content: "Erro alterações no produto não pôde ser salvado", type: enums.AlertType.DANGER });
                    console.log(errorData);
                });
        }

        removeProduct(product: domain.Product) {
            this.ProductService.remove(product,
                (successData, successStatus) => {
                    this.AlertService.add({ title: "Remover Produto", content: product.name + " foi removido com sucesso" });
                    this.newProduct();
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ title: "Remover Produto", content: "Produto não pôde ser removido", type: enums.AlertType.DANGER });
                    console.log(errorData);
                });
        }

        fetchProduct(id: number) {
            if (id > 0) {
                this.ProductService.find(id,
                    (successData, successStatus) => {
                        this.$scope.product = successData;
                    },
                    (errorData, errorStatus) => {
                        this.AlertService.add({ title: "Buscar Produto", content: "Erro produto com o ID especificado não foi encontrado", type: enums.AlertType.WARNING });
                        console.log(errorData);
                        this.newProduct();
                    });
            }
            else {
                this.newProduct();
            }
        }

        newProduct() {
            this.$scope.navigator.$location.url("/product/new");
        }

        emptyProduct() {
            this.$scope.product = { id: 0, name: "", description: "", price: 0, costPrice: 0, category: "", ncm: "" };
        }
        
        fetchCategories() {
            this.ProductService.listCategory(
                (successData) => {
                    this.$scope.categories = [];
                    this.allCategories = successData;
                },
                (errorData) => { });
        }

        isProductNew() {
            return (this.$scope.product && this.$scope.product.id == 0);
        }

        watchProduct() {
            this.$scope.$watch("product.id", (newValue: number, oldValue: number) => {
                this.$scope.isProductNew = this.isProductNew();
            });
            this.$scope.$watch("product.price + product.costPrice", () => {
                if (this.$scope.product != null && this.$scope.product.costPrice != 0)
                    this.$scope.profitMargin = this.$scope.product.price / this.$scope.product.costPrice;
            });
            this.$scope.$watch("product.category", (newValue: string, oldValue: string) => {
                this.$scope.categories = this.$filter("filter")(this.allCategories, this.$scope.product.category);
            });
            
        }

        processArgs() {
            var routeProdId = this.$scope.navigator.params().productId;
            if (routeProdId > 0) {
                this.fetchProduct(Number(routeProdId));
            } else if (routeProdId == 0 || routeProdId == "new") {
                
            } else {
                this.AlertService.add({ content: "Produto ID Inválido", type: "warning" });
                this.newProduct();
            }
        }

        populateScope() {
            this.emptyProduct();

            this.processArgs();
            this.watchProduct();
            this.fetchCategories();
            this.$scope.saveChanges = (product) => this.saveChanges(product);
            this.$scope.removeProduct = (product) => this.removeProduct(product);
        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("EditProductController", controller.product.EditProductController);
};