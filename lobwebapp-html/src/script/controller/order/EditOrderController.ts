///<reference path="./../../reference.d.ts"/>

export module controller.order {
    interface Status { content: string; type: string; }
    export interface EditOrderViewModel extends d.controller.base.ViewModel {
        client: domain.Client;
        product: domain.Product;
        order: domain.Order;
        payment: number;
        exchange: number;
        total: number;
        isNewOrder: boolean;
        addProduct: (id: number, quantity: number) => void;
        removeProduct: (id: number) => void;
        quickSearchProduct: () => void;
        fetchProduct: () => void;
    }

    export class EditOrderController implements d.controller.base.Controller {

        static $inject = ["$scope", "ProductService", "$timeout", "AlertService"];
        constructor(public $scope: EditOrderViewModel, public ProductService: d.service.contract.ProductService, public $timeout: ng.ITimeoutService, public AlertService: d.service.contract.util.AlertService) {
            this.populateScope();
            this.processArgs();
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
                    }, (errorData: domain.util.Error) => {
                        this.AlertService.add({ content: errorData.message, title: "Produto nao encontrado", type: "warning" });
                    });
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
            this.$timeout(() => { //TODO: Fix this ugly hack
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

        emptyProduct() {
            this.$scope.product = { id: 0, name: "", description: "", quantity: 0, price: 0 };
        }

        emptyClient() {
            this.$scope.client = { id: 0, name: "", lastName: "" };
        }

        fetchProduct() {
            if (this.$scope.product.id > 0) {
                this.ProductService.find(this.$scope.product.id,
                    (successData: domain.Product) => {
                        this.$scope.product = successData;
                        this.$scope.product.quantity = 0;
                    }, (errorData: domain.util.Error) => {
                        this.emptyProduct();
                    });
            }
            else {
                this.emptyProduct();
            }
        }

        listenOrderChanges() {
            this.$scope.$watch("order", (newValue: domain.Order, oldValue: domain.Order) => {
                console.log("Object order changed");
                this.$scope.isNewOrder = this.isNewOrder();
            });
            this.$scope.$watch("payment", (newValue: domain.Order, oldValue: domain.Order) => {
                if (this.$scope.total > 0) {
                    var sum = this.$scope.payment - this.$scope.total;
                    if (sum > 0) this.$scope.exchange = sum;
                    else this.$scope.exchange = 0;
                } else {
                    this.$scope.exchange = 0;
                }
            });
        }

        listenProductsChanges() {
            this.$scope.$watch("order.products", (newValue: domain.Product[], oldValue: domain.Product[]) => {
                console.log("Object order.products changed");
                this.total();
            }, true);
        }

        processArgs() {
            this.$scope.product.id = this.$scope.navigator.params().productId;
            this.$scope.client.id = this.$scope.navigator.params().clientId;
            var orderId = this.$scope.navigator.params().orderId;

            if (orderId) {
                //TODO: OrderService to fetch order...

            }
            this.fetchProduct();
        }

        populateScope() {
            this.$scope.order = { id: 0, client: null, products: [], status: { payment: -1, delivery: -1 }, paymentMode: 0 };
            this.emptyClient();
            this.emptyProduct();
            this.listenOrderChanges();
            this.listenProductsChanges();
            this.$scope.addProduct = (id: number, quantity: number) => this.addProduct(id, quantity);
            this.$scope.removeProduct = (index: number) => this.removeProduct(index);
            this.$scope.quickSearchProduct = () => this.quickSearchProduct();
            this.$scope.fetchProduct = () => this.fetchProduct();
        }
    }
}

angular.module("lwa.controller").lazy.controller("EditOrderController", controller.order.EditOrderController);