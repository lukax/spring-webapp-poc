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
        addItem(productId: number, quantity: number): void;
        removeItem(item: domain.OrderItem): void;
        quickSearchProduct(): void;
        fetchProduct(id: number): void;
        fetchCustomer(id: number): void;
    }

    export class EditOrderController implements d.controller.base.Controller {

        static $inject = ["$scope", "ProductService", "$timeout", "AlertService", "CustomerService", "OrderService"];
        constructor(public $scope: EditOrderViewModel,
            public ProductService: d.service.contract.ProductService,
            public $timeout: ng.ITimeoutService,
            public AlertService: d.service.contract.AlertService,
            public CustomerService: d.service.contract.CustomerService,
            public OrderService: d.service.contract.OrderService) {

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
            this.OrderService.update(order,
                (successData, successStatus) => {
                    this.AlertService.add({ title: "Atualizar Pedido", content: "Pedido foi atualizado com sucesso" });
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ title: "Atualizar Pedido", content: "Erro pedido não pôde ser atualizado", type: enums.AlertType.DANGER });
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

        addItem(productId: number, quantity: number) {
            var exists = this.$scope.order.items.some((x) => {
                if (x.product.id == productId) {
                    x.quantity += quantity;
                    return true;
                }
                return false;
            });
            if (!exists) {
                this.ProductService.find(productId,
                    (successData) => {
                        this.$scope.order.items.push({ product: successData, quantity: quantity });
                    }, (errorData) => {
                        this.AlertService.add({ title: "Buscar Produto", content: errorData.message, type: enums.AlertType.WARNING });
                    });
            }
            this.emptyProduct();
        }

        removeItem(orderItem: domain.OrderItem) {
            this.$scope.order.items = _.without(this.$scope.order.items, orderItem);
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
                this.$scope.order.items.forEach((x) => {
                    sum += x.quantity * x.product.price;
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
                        this.$scope.product = successData;
                    }, (errorData: domain.util.Error) => {
                        this.AlertService.add({ title: "Buscar Cliente", content: errorData.message, type: enums.AlertType.WARNING });
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
                        this.AlertService.add({ title: "Buscar Produto", content: errorData.message, type: enums.AlertType.WARNING });
                        this.emptyCustomer();
                    });
            }
            else {
                this.emptyCustomer();
            }
        }

        watchOrder() {
            this.$scope.$watch("order.id", (newValue: number, oldValue: number) => {
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
            this.$scope.$watch("order.items", (newValue: domain.Product[], oldValue: domain.Product[]) => {
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

            this.$scope.order = { id: 0, customer: null, items: [], payment: { id: 0, quantity: 0, status: enums.PaymentStatus.PENDING, mode: enums.PaymentMode.MONEY }, date: new Date() };
            this.emptyCustomer();
            this.emptyProduct();

            this.$scope.saveChanges = (order: domain.Order) => this.saveChanges(order);
            this.$scope.addItem = (id: number, quantity: number) => this.addItem(id, quantity);
            this.$scope.removeItem = (item: domain.OrderItem) => this.removeItem(item);
            this.$scope.quickSearchProduct = () => this.quickSearchProduct();
            this.$scope.fetchProduct = (id: number) => this.fetchProduct(id);
            this.$scope.fetchCustomer = (id: number, $event?: any) => this.fetchCustomer(id);
        }
    }
}


export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("EditOrderController", controller.order.EditOrderController);
};