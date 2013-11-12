///<reference path="./../../reference.d.ts"/>

export module controller.order {
    interface Status { content: string; type: string; }
    export interface EditOrderViewModel extends d.controller.base.ViewModel {
        clientId: number;
        productId: number;
        productQuantity: number;
        order: domain.Order;
        isNewOrder: boolean;
        total: number;
        addProduct: (id: number, quantity: number) => void;
        removeProduct: (id: number) => void;
        quickSearchProduct: () => void;
    }

    export class EditOrderController implements d.controller.base.Controller {

        static $inject = ["$scope", "ProductService", "$timeout"];
        constructor(public $scope: EditOrderViewModel, public ProductService: d.service.contract.ProductService, public $timeout: ng.ITimeoutService) {
            this.processArgs();
            this.populateScope();
        }

        addProduct(id: number, quantity: number) {
            var exists = false;
            this.$scope.order.products.some((x: domain.Product) => {
                if (x.id == id) {
                    x.quantity += quantity;
                    exists = true;
                    return true;
                }
                return false;
            });
            if (!exists) {
                this.ProductService.find(id,
                    (successData: domain.Product) => {
                        successData.quantity = quantity;
                        this.$scope.order.products.push(successData);
                    }, (errorData) => { });
            }
        }

        removeProduct(id: number) {
            this.$scope.order.products.some((x: domain.Product, index: number) => {
                if (x.id == id) {
                    this.$scope.order.products.splice(index, 1);
                    return true;
                }
                return false;
            });
        }

        quickSearchProduct() {
            var preparedUrl = "/order/" + (this.isNewOrder() ? "new" : String(this.$scope.order.id));
            this.$scope.navigator.navigateTo("/product/list?redirect=" + preparedUrl);
        }

        total() {
            this.$timeout(() => {
                var sum: number = 0;
                this.$scope.order.products.forEach((x: domain.Product) => {
                    sum += x.quantity * x.price;
                });
                this.$scope.total = sum;
            }, 100);
        }

        isNewOrder() {
            return (this.$scope.order.id == 0);
        }

        listenOrderChanges() {
            this.$scope.$watch("order", (newValue: domain.Order, oldValue: domain.Order) => {
                console.log("Object order changed");
                this.$scope.isNewOrder = this.isNewOrder();
            });
        }

        listenProductsChanges() {
            this.$scope.$watch("order.products", (newValue: domain.Product[], oldValue: domain.Product[]) => {
                console.log("Object order.products changed");
                this.total();
            }, true);
        }

        processArgs() {
            this.$scope.productId = this.$scope.navigator.params().productId;
            this.$scope.clientId = this.$scope.navigator.params().clientId;
            var orderId = this.$scope.navigator.params().orderId;
            if (orderId) {
                //TODO: OrderService to fetch order...
            }
        }

        populateScope() {
            this.listenOrderChanges();
            this.listenProductsChanges();
            this.$scope.order = { id: 0, client: "", products: [], status: [] };
            this.$scope.addProduct = (id: number, quantity: number) => this.addProduct(id, quantity);
            this.$scope.removeProduct = (index: number) => this.removeProduct(index);
            this.$scope.quickSearchProduct = () => this.quickSearchProduct();
        }
    }
}

(<any>angular.module("lwa.controller")).lazy.controller("EditOrderController", controller.order.EditOrderController);