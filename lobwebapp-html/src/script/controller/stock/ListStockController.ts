///<reference path="./../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");

export module controller.stock {
    export interface ListStockViewModel extends d.controller.base.ViewModel {
        stocks: domain.Stock[];
        searchText: string;
        editStock: (id: number) => void;
        listStock: () => void;
    }

    export class ListStockController implements d.controller.base.Controller{
        private redirect: string;

        static $inject = ["$scope", "StockService", "AlertService", "NavigationService"];
        constructor(public $scope: ListStockViewModel,
            public StockService: d.service.contract.StockService,
            public AlertService: d.service.contract.AlertService,
            public NavigationService:d.service.contract.NavigationService) {

            this.processArgs();
            this.populateScope();
        }

        listStock() {
            this.NavigationService.progress.start();
            this.StockService.list(
                (successData, successStatus) => {
                    this.$scope.stocks = successData;
                    this.NavigationService.progress.done();
                    if (this.redirect) this.AlertService.add({ title: "Busca Rápida", content: "Clique em um Produto da lista para voltar para a página anterior", type: enums.AlertType.INFO }); 
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ title: "Listar Estoques", content: "Lista de Estoque não pôde ser carregada", type: enums.AlertType.DANGER });
                    console.log(errorData);
                    this.NavigationService.progress.done();
                });
        }

        editStock(id: number) {
            if (this.redirect) this.NavigationService.navigateTo(this.redirect + "?stockId=" + id);
            else this.NavigationService.navigateTo("/stock/"+id);
        }

        processArgs() {
            this.$scope.searchText = this.NavigationService.params().search;
            this.redirect = this.NavigationService.params().redirect;
            this.listStock();
        }

        populateScope() {
            this.$scope.editStock = (id: number) => this.editStock(id);
            this.$scope.listStock = () => this.listStock();
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("ListStockController", controller.stock.ListStockController);
};