///<reference path="./../../reference.d.ts"/>

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
                    public AlertService: d.service.contract.util.AlertService,
                    public NavigationService:d.service.contract.util.NavigationService) {

            this.processArgs();
            this.populateScope();
        }

        listOrder() {
            this.NavigationService.progress.start();
            this.OrderService.list(
                (successData, successStatus) => {
                    this.$scope.orders = successData;
                    this.NavigationService.progress.done();
                    if (this.redirect) this.AlertService.add({ content: "Clique em um Pedido da lista para voltar para a página anterior", title: "Busca Rápida", type: "info" }); 
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ content: String(errorData), title: "Lista de Pedidos não pôde ser carregada", type: "danger" });
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