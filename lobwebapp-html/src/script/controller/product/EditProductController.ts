///<reference path="./../../reference.d.ts"/>
import a = require("./../../util/StdUtil");

export module controller.product {
    export interface EditProductViewModel extends d.controller.base.ViewModel {
        product: domain.Product;
        pricePattern: RegExp;
        profitMargin: number;
        productGroups: string[];
        isNewProduct: boolean;
        saveChanges: (product: domain.Product) => void;
        removeProduct: (product: domain.Product) => void;
        priceInfo: () => void;
    }

    export class EditProductController implements d.controller.base.Controller {

        static $inject = ["$scope", "ProductService", "AlertService", "$ekathuwa"];
        constructor(public $scope: EditProductViewModel,
            public ProductService: d.service.contract.ProductService,
            public AlertService: d.service.contract.util.AlertService,
            public $ekathuwa: any) {

            this.processArgs();
            this.populateScope();
        }

        newProduct() {
            this.$scope.navigator.$location.url("/product/new");
        }

        saveProduct(product: domain.Product) {
            this.ProductService.save(product,
                (successData: domain.Product, successStatus) => {
                    this.AlertService.add("Novo produto " + successData.name + " foi adicionado", "Novo");
                    this.$scope.navigator.$location.url("/product/" + String(successData));
                },
                (errorData, errorStatus) => {
                    this.AlertService.add("Produto não pode ser salvado", String(errorData), "danger");
                });
        }

        updateProduct(product: domain.Product) {
            this.ProductService.update(product,
                (successData, successStatus) => {
                    this.AlertService.add("Alterações em " + successData.name + " foram bem sucedidas", "Atualização");
                },
                (errorData, errorStatus) => {
                    this.AlertService.add("Produto não pode ser atualizado", String(errorData), "danger");
                });
        }

        saveChanges(product: domain.Product) {
            if (this.$scope.product.id == 0) this.saveProduct(product);
            else this.updateProduct(product);
        }

        removeProduct(product: domain.Product) {
            this.ProductService.remove(product,
                (successData, successStatus) => {
                    this.AlertService.add("Produto removido com sucesso");
                    this.newProduct();
                },
                (errorData, errorStatus) => {
                    this.AlertService.add("Produto não pode ser removido", String(errorData), "danger");
                });
        }

        findProduct(id: number) {
            this.ProductService.find(id,
                (successData, successStatus) => {
                    this.$scope.product = successData;
                },
                (errorData, errorStatus) => {
                    this.AlertService.add("Produto com o ID especificado não foi encontrado", String(errorData), "warning");
                    this.newProduct();
                });
        }

        fetchGroups() {
            this.ProductService.listGroups(
                (successData) => { this.$scope.productGroups = successData; },
                (errorData) => { });
        }

        isNewProduct() {
            return (this.$scope.product && this.$scope.product.id == 0);
        }

        priceInfo() {
            this.priceInfoModal();
        }

        priceInfoModal() {
            this.$ekathuwa.modal({
                id: "priceInfoModalId",
                templateURL: "view/product/modal/priceInfoModal.html",
                scope: this.$scope,
                onHidden: () => { this.$scope.navigator.$location.search("priceInfo", null); }
            });
        }

        onProfitMargin() {
            this.$scope.$watch("product.price + product.costPrice", () => {
                if (this.$scope.product != null && this.$scope.product.costPrice !== 0)
                    this.$scope.profitMargin = a.util.Std.round(this.$scope.product.price / this.$scope.product.costPrice, 2);
            });
        }

        onProduct() {
            this.$scope.$watch("product", (newValue: domain.Product, oldValue: domain.Product) => {
                console.log("EditProductController: product object changed");
                this.$scope.isNewProduct = this.isNewProduct();
            }, true);
        }

        processArgs() {
            var routeProdId = this.$scope.navigator.params().productId;
            if (routeProdId > 0) {
                this.findProduct(Number(routeProdId));
            } else if (routeProdId == 0) {
                this.newProduct();
            } else if (routeProdId == "new") {
                this.$scope.product = { id: 0, name: "s", description: "", quantity: 0, price: 0, costPrice: 0, group: "", ncm: 0 };
            } else {
                this.AlertService.add("Produto ID Inválido", "", "warning");
                this.newProduct();
            }
            if (this.$scope.navigator.params().priceInfo == "true") {
                this.priceInfoModal();
            }
        }

        populateScope() {
            this.onProduct();
            this.onProfitMargin();
            this.$scope.pricePattern = /^(?=.*[1-9])\d*(?:\.\d{1,2})?$/;
            this.$scope.saveChanges = (product: domain.Product) => this.saveChanges(product);
            this.$scope.removeProduct = (product: domain.Product) => this.removeProduct(product);
            this.$scope.priceInfo = () => this.priceInfo();
            this.fetchGroups();
        }
    }
}

(<any>angular.module("lwa.controller")).lazy.controller("EditProductController", controller.product.EditProductController);