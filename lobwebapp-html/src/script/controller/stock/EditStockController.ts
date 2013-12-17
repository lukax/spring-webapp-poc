///<reference path="./../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");

export module controller.stock {
    export interface EditStockViewModel extends d.controller.base.ViewModel {
        stock: domain.Stock;
        isStockNew: boolean;
        saveChanges: (stock: domain.Stock) => void;
        removeStock: (stock: domain.Stock) => void;
        fetchProduct: (productId: number) => void;
        quickSearchProduct: () => void;
    }

    export class EditStockController implements d.controller.base.Controller {

        static $inject = ["$scope", "StockService", "ProductService"];
        constructor(public $scope: EditStockViewModel,
            public StockService: d.service.contract.StockService,
            public ProductService: d.service.contract.ProductService) {

            this.processArgs();
            this.populateScope();
        }

        saveChanges(stock: domain.Stock) {
            if (this.$scope.stock.id == 0) this.saveStock(stock);
            else this.updateStock(stock);
        }

        saveStock(stock: domain.Stock) {
            this.StockService.save(stock,
                (successData: domain.Stock, successStatus) => {
                    this.$scope.navigator.$location.url("/stock/" + String(successData.id));
                },
                (errorData, errorStatus) => {
                    console.log(errorData);
                });
        }

        updateStock(stock: domain.Stock) {
            this.StockService.update(stock,
                (successData, successStatus) => {
                },
                (errorData, errorStatus) => {
                    console.log(errorData);
                });
        }

        removeStock(stock: domain.Stock) {
            this.StockService.remove(stock,
                (successData, successStatus) => {
                    this.newStock();
                },
                (errorData, errorStatus) => {
                    console.log(errorData);
                });
        }

        findStock(id: number) {
            this.StockService.find(id,
                (successData, successStatus) => {
                    this.$scope.stock = successData;
                },
                (errorData, errorStatus) => {
                    console.log(errorData);
                    this.newStock();
                });
        }

        fetchProduct(id: number) {
            this.ProductService.find(id,
                (successData, successStatus) => {
                    this.$scope.stock.product = successData;
                },
                (errorData, errorStatus) => {
                    console.log(errorData);
                });
        }

        quickSearchProduct() {
            var preparedUrl = "/stock/" + (this.isStockNew() ? "new" : String(this.$scope.stock.id));
            this.$scope.navigator.navigateTo("/product/list?redirect=" + preparedUrl);
        }

        newStock() {
            this.$scope.navigator.$location.url("/stock/new");
        }

        emptyStock() {
            this.$scope.stock = { id: 0, product: null, quantity: 0, unit: "" };
        }

        isStockNew() {
            return (this.$scope.stock != null && this.$scope.stock.id == 0);
        }

        watchStock() {
            this.$scope.$watch("stock.id", (newValue: number, oldValue: number) => {
                this.$scope.isStockNew = this.isStockNew();
            });
        }

        processArgs() {
            var stockId = this.$scope.navigator.params().stockId;
            var productId = this.$scope.navigator.params().productId;
            if (stockId > 0) {
                this.findStock(Number(stockId));
            } else if (stockId == 0) {
                this.newStock();
            } else if (stockId == "new") {
                this.emptyStock();
                if (productId > 0) {
                    this.fetchProduct(Number(productId));
                }
            } else {
                this.newStock();
            }
        }

        populateScope() {
            this.watchStock();
            this.$scope.saveChanges = (stock) => this.saveChanges(stock);
            this.$scope.removeStock = (stock) => this.removeStock(stock);
            this.$scope.fetchProduct = (productId) => this.fetchProduct(productId);
            this.$scope.quickSearchProduct = () => this.quickSearchProduct();
        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("EditStockController", controller.stock.EditStockController);
};