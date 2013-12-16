///<reference path="./../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");

export module controller.customer {
    export interface ListCustomerViewModel extends d.controller.base.ViewModel {
        customers: domain.Customer[];
        searchText: string;
        editCustomer: (id: number) => void;
        listCustomer: () => void;
    }

    export class ListCustomerController implements d.controller.base.Controller{
        private redirect: string;

        static $inject = ["$scope", "CustomerService", "AlertService", "NavigationService"];
        constructor(public $scope: ListCustomerViewModel,
            public CustomerService: d.service.contract.CustomerService,
            public AlertService: d.service.contract.AlertService,
            public NavigationService:d.service.contract.NavigationService) {

            this.processArgs();
            this.populateScope();
        }

        listCustomer() {
            this.NavigationService.progress.start();
            this.CustomerService.list(
                (successData, successStatus) => {
                    this.$scope.customers = successData;
                    this.NavigationService.progress.done();
                    if (this.redirect) this.AlertService.add({ title: "Busca Rápida", content: "Clique em um Cliente da lista para voltar para a página anterior", type: enums.AlertType.INFO }); 
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ title: "Listar Clientes", content: "Lista de Clientes não pôde ser carregada", type: enums.AlertType.DANGER });
                    console.log(errorData);
                    this.NavigationService.progress.done();
                });
        }

        editCustomer(id: number) {
            if (this.redirect) this.NavigationService.navigateTo(this.redirect + "?customerId=" + id);
            else this.NavigationService.navigateTo("/customer/"+id);
        }

        processArgs() {
            this.$scope.searchText = this.NavigationService.params().search;
            this.redirect = this.NavigationService.params().redirect;
            this.listCustomer();
        }

        populateScope() {
            this.$scope.editCustomer = (id: number) => this.editCustomer(id);
            this.$scope.listCustomer = () => this.listCustomer();
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("ListCustomerController", controller.customer.ListCustomerController);
};