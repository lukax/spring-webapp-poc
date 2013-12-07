///<reference path="./../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");

export module controller.order {
    export interface EditOrderViewModel extends d.controller.base.ViewModel {
        product: domain.Product;
        order: domain.Order;
        exchange: number;
        total: number;
        isOrderNew: boolean;
        saveChanges(order: domain.Order): void;
        addProduct(id: number, quantity: number): void;
        removeProduct(id: number): void;
        quickSearchProduct(): void;
        fetchProduct(id: number): void;
        fetchCustomer(id: number): void;
    }

    export class EditOrderController implements d.controller.base.Controller {

        static $inject = ["$scope", "ProductService", "$timeout", "AlertService", "CustomerService", "OrderService"];
        constructor(public $scope: EditOrderViewModel, public ProductService: d.service.contract.ProductService, public $timeout: ng.ITimeoutService,
            public AlertService: d.service.contract.util.AlertService, public CustomerService: d.service.contract.CustomerService, public OrderService: d.service.contract.OrderService) {

            this.populateScope();
            this.processArgs();
        }

        saveChanges(order: domain.Order) {
            if (this.$scope.order.id == 0) this.saveOrder(order);
            else this.updateOrder(order); 
        }

        saveOrder(order: domain.Order) {
            this.OrderService.save(order,
                (successData: domain.Order, successStatus) => {
                    this.AlertService.add({ title: "Novo Pedido", content: "Pedido foi adicionado com sucesso" });
                    this.$scope.navigator.$location.url("/order/" + String(successData.id));
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ title: "Novo Pedido", content: "Erro pedido não pôde ser salvado", type: enums.AlertType.DANGER });
                    console.log(errorData);
                });
        }

        updateOrder(order: domain.Order) {
            debugger;
            this.OrderService.update(order, 
                (successData, successStatus) => {
                    this.AlertService.add({ title: "Editar Pedido", content: "Pedido foi atualizado com sucesso" });
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ title: "Editar Pedido", content: "Erro pedido não pôde ser atualizado", type: enums.AlertType.DANGER });
                    console.log(errorData);
                });
        }

        removeOrder(order: domain.Order) {
            this.OrderService.remove(order,
                (successData, successStatus) => {
                    this.AlertService.add({ title: "Remover Pedido", content: "Pedido foi removido com sucesso" });
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ title: "Remover Pedido", content: "Erro pedido não pôde ser removido", type: enums.AlertType.DANGER });
                    console.log(errorData);
                });
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
                        this.AlertService.add({ title: "Buscar Produto", content: errorData.message, type: enums.AlertType.WARNING });
                    });
            }
            this.emptyProduct();
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

        newOrder() {
            this.$scope.navigator.$location.url("/order/new");
        }

        quickSearchProduct() {
            var preparedUrl = "/order/" + (this.isOrderNew() ? "new" : String(this.$scope.order.id));
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

        isOrderNew() {
            return (this.$scope.order.id == 0);
        }

        emptyProduct() {
            this.$scope.product = { id: 0, name: "", description: "", quantity: 0, price: 0 };
        }

        emptyCustomer() {
            this.$scope.order.customer = { id: 0, name: "" };
        }

        fetchProduct(id: number) {
            if (id > 0) {
                this.ProductService.find(id,
                    (successData: domain.Product) => {
                        var previousQt = this.$scope.product.quantity;
                        this.$scope.product = successData;
                        this.$scope.product.quantity = previousQt;
                    }, (errorData: domain.util.Error) => {
                        this.emptyProduct();
                    });
            }
            else {
                this.emptyProduct();
            }
        }

        fetchCustomer(id: number) {
            if (id > 0) {
                this.CustomerService.find(id,
                    (successData: domain.Customer) => {
                        this.$scope.order.customer = successData;
                    }, (errorData: domain.util.Error) => {
                        this.emptyCustomer();
                    });
            }
            else {
                this.emptyCustomer();
            }
        }

        watchOrder() {
            this.$scope.$watch("order.id", (newValue: number, oldValue: number) => {
                console.log("Object order.id changed");
                this.$scope.isOrderNew = this.isOrderNew();
            });
            this.$scope.$watch("payment", (newValue: domain.Order, oldValue: domain.Order) => {
                if (this.$scope.total > 0) {
                    var sum = this.$scope.order.payment.quantity - this.$scope.total;
                    if (sum > 0) this.$scope.exchange = sum;
                    else this.$scope.exchange = 0;
                } else {
                    this.$scope.exchange = 0;
                }
            });
            this.$scope.$watch("order.products", (newValue: domain.Product[], oldValue: domain.Product[]) => {
                console.log("Object order.products changed");
                this.total();
            }, true);
        }

        processArgs() {
            var orderId = this.$scope.navigator.params().orderId;
            if (orderId > 0) {
                this.OrderService.find(orderId,
                    (successData) => {
                        this.$scope.order = successData;
                    }, (errorData) => {
                        this.AlertService.add({ content: "Pedido ID Inválido", type: enums.AlertType.WARNING });
                    });
            }

            this.$scope.product.id = this.$scope.navigator.params().productId;
            this.$scope.order.customer.id = this.$scope.navigator.params().customerId;
        }

        populateScope() {
            this.watchOrder();

            this.$scope.order = { id: 0, customer: null, products: [], payment: { id:0, quantity: 0, status: enums.PaymentStatus.PENDING, mode: enums.PaymentMode.MONEY }, date: new Date() };
            this.emptyCustomer();
            this.emptyProduct();
            this.fetchProduct(0);

            this.$scope.saveChanges = (order: domain.Order) => this.saveChanges(order);
            this.$scope.addProduct = (id: number, quantity: number) => this.addProduct(id, quantity);
            this.$scope.removeProduct = (index: number) => this.removeProduct(index);
            this.$scope.quickSearchProduct = () => this.quickSearchProduct();
            this.$scope.fetchProduct = (id: number) => this.fetchProduct(id);
            this.$scope.fetchCustomer = (id: number) => this.fetchCustomer(id);
        }
    }
}


export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("EditOrderController", controller.order.EditOrderController);
};