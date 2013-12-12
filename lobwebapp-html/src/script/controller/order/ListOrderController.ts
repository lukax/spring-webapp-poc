///<reference path="./../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");

export module controller.order {
    export interface ListOrderViewModel extends d.controller.base.ViewModel {
        orders: domain.Order[];
        searchText: string;
        editOrder: (id: number) => void;
        listOrder: () => void;
    }

    export class ListOrderController implements d.controller.base.Controller{
        private redirect: string;

        static $inject = ["$scope", "OrderService", "AlertService", "NavigationService"];
        constructor(public $scope: ListOrderViewModel,
                    public OrderService: d.service.contract.OrderService,
                    public AlertService: d.service.contract.AlertService,
                    public NavigationService:d.service.contract.NavigationService) {

            this.processArgs();
            this.populateScope();
        }

        listOrder() {
            this.NavigationService.progress.start();
            this.OrderService.list(
                (successData, successStatus) => {
                    this.$scope.orders = successData;
                    this.NavigationService.progress.done();
                    if (this.redirect) this.AlertService.add({ title: "Busca Rápida", content: "Clique em um Pedido da lista para voltar para a página anterior", type: enums.AlertType.INFO }); 
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ title: "Listar Pedidos", content: "Lista de Pedidos não pôde ser carregada", type: enums.AlertType.DANGER });
                    console.log(errorData);
                    this.NavigationService.progress.done();
                });
        }

        editOrder(id: number) {
            if (this.redirect) this.NavigationService.navigateTo(this.redirect + "?orderId=" + id);
            else this.NavigationService.navigateTo("/order/"+id);
        }

        processArgs() {
            this.$scope.searchText = this.NavigationService.params().search;
            this.redirect = this.NavigationService.params().redirect;
            this.listOrder();
        }

        populateScope() {
            this.$scope.editOrder = (id: number) => this.editOrder(id);
            this.$scope.listOrder = () => this.listOrder();
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("ListOrderController", controller.order.ListOrderController);
};