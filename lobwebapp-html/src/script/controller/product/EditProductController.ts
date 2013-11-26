///<reference path="./../../reference.d.ts"/>
import a = require("./../../util/StdUtil");
import enums = require("./../../util/EnumUtil");

export module controller.product {
    export interface EditProductViewModel extends d.controller.base.ViewModel {
        product: domain.Product;
        profitMargin: number;
        categories: string[];
        isProductNew: boolean;
        saveChanges: (product: domain.Product) => void;
        removeProduct: (product: domain.Product) => void;
        priceInfo: () => void;
    }

    export class EditProductController implements d.controller.base.Controller {

        static $inject = ["$scope", "$modal", "ProductService", "AlertService"];
        constructor(public $scope: EditProductViewModel,
            public $modal: any,
            public ProductService: d.service.contract.ProductService,
            public AlertService: d.service.contract.util.AlertService) {

            this.processArgs();
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
                    this.AlertService.add({ title: "Editar Produto", content: "Alterações em " + product.name + " foram bem sucedidas" });
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ title: "Editar Produto", content: "Erro alterações no produto não pôde ser salvado", type: enums.AlertType.DANGER });
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

        findProduct(id: number) {
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

        newProduct() {
            this.$scope.navigator.$location.url("/product/new");
        }

        fetchCategories() {
            this.ProductService.listCategory(
                (successData) => { this.$scope.categories = successData; },
                (errorData) => { });
        }

        isProductNew() {
            return (this.$scope.product && this.$scope.product.id == 0);
        }

        priceInfo() {
            this.priceInfoModal();
        }

        private priceInfoModalInstance;
        priceInfoModal() {
            if(this.priceInfoModalInstance){
                this.priceInfoModalInstance.close();
                this.priceInfoModalInstance = null;
                return;
            }
            this.priceInfoModalInstance = this.$modal.open({
                templateUrl: "view/product/modal/priceInfoModal.html",
                scope: this.$scope
            });
        }
        
        watchProduct() {
            this.$scope.$watch("product", (newValue: domain.Product, oldValue: domain.Product) => {
                console.log("EditProductController: product object changed");
                this.$scope.isProductNew = this.isProductNew();
            }, true);
            this.$scope.$watch("product.price + product.costPrice", () => {
                if (this.$scope.product != null && this.$scope.product.costPrice !== 0)
                    this.$scope.profitMargin = a.util.Std.round(this.$scope.product.price / this.$scope.product.costPrice, 2);
            });
        }

        processArgs() {
            var routeProdId = this.$scope.navigator.params().productId;
            if (routeProdId > 0) {
                this.findProduct(Number(routeProdId));
            } else if (routeProdId == 0) {
                this.newProduct();
            } else if (routeProdId == "new") {
                this.$scope.product = { id: 0, name: "s", description: "", quantity: 0, price: 0, costPrice: 0, category: "", ncm: "" };
            } else {
                this.AlertService.add({ content: "Produto ID Inválido", type: "warning" });
                this.newProduct();
            }
            if (this.$scope.navigator.params().priceInfo == "true") {
                this.priceInfoModal();
            }
        }

        populateScope() {
            this.watchProduct();
            this.$scope.saveChanges = (product: domain.Product) => this.saveChanges(product);
            this.$scope.removeProduct = (product: domain.Product) => this.removeProduct(product);
            this.$scope.priceInfo = () => this.priceInfo();
            this.fetchCategories();
        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("EditProductController", controller.product.EditProductController);
};