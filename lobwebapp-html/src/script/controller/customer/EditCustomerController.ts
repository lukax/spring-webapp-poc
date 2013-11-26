///<reference path="./../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");

export module controller.customer {
    export interface EditCustomerViewModel extends d.controller.base.ViewModel {
        customer: domain.Customer;
        isCustomerNew: boolean;
        saveChanges: (customer: domain.Customer) => void;
        removeCustomer: (customer: domain.Customer) => void;
    }

    export class EditCustomerController implements d.controller.base.Controller {

        static $inject = ["$scope", "CustomerService", "AlertService"];
        constructor(public $scope: EditCustomerViewModel,
            public CustomerService: d.service.contract.CustomerService,
            public AlertService: d.service.contract.util.AlertService) {

            this.processArgs();
            this.populateScope();
        }

        saveChanges(customer: domain.Customer) {
            if (this.$scope.customer.id == 0) this.saveCustomer(customer);
            else this.updateCustomer(customer);
        }

        saveCustomer(customer: domain.Customer) {
            this.CustomerService.save(customer,
                (successData: domain.Customer, successStatus) => {
                    this.AlertService.add({ title: "Novo Cliente", content: customer.name + " foi adicionado",  });
                    this.$scope.navigator.$location.url("/customer/" + String(successData.id));
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ title: "Novo Cliente", content: "Erro cliente não pôde ser salvado", type: enums.AlertType.DANGER });
                    console.log(errorData);
                });
        }

        updateCustomer(customer: domain.Customer) {
            this.CustomerService.update(customer,
                (successData, successStatus) => {
                    this.AlertService.add({ title: "Editar Cliente", content: "Alterações em " + customer.name + " foram bem sucedidas" });
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ title: "Editar Cliente", content: "Erro cliente não pôde ser atualizado", type: enums.AlertType.DANGER });
                    console.log(errorData);
                });
        }

        removeCustomer(customer: domain.Customer) {
            this.CustomerService.remove(customer,
                (successData, successStatus) => {
                    this.AlertService.add({ title: "Remover Cliente", content: customer.name + " foi removido com sucesso" });
                    this.newCustomer();
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ title: "Remover Cliente", content: "Erro cliente não pôde ser removido", type: enums.AlertType.DANGER });
                    console.log(errorData);
                });
        }

        findCustomer(id: number) {
            this.CustomerService.find(id,
                (successData, successStatus) => {
                    this.$scope.customer = successData;
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ title: "Buscar Cliente", content: "Erro cliente com o ID especificado não foi encontrado", type: enums.AlertType.WARNING });
                    console.log(errorData);
                    this.newCustomer();
                });
        }

        newCustomer() {
            this.$scope.navigator.$location.url("/customer/new");
        }


        isCustomerNew() {
            return (this.$scope.customer && this.$scope.customer.id == 0);
        }

        watchCustomer() {
            this.$scope.$watch("customer", (newValue: domain.Customer, oldValue: domain.Customer) => {
                this.$scope.isCustomerNew = this.isCustomerNew();
            }, true);
        }

        processArgs() {
            var customerId = this.$scope.navigator.params().customerId;
            if (customerId > 0) {
                this.findCustomer(Number(customerId));
            } else if (customerId == 0) {
                this.newCustomer();
            } else if (customerId == "new") {
                this.$scope.customer = { id: 0, name: "" };
            } else {
                this.AlertService.add({ content: "Erro cliente ID inválido", type: enums.AlertType.WARNING });
                this.newCustomer();
            }
        }

        populateScope() {
            this.watchCustomer();
            this.$scope.saveChanges = (customer: domain.Customer) => this.saveChanges(customer);
            this.$scope.removeCustomer = (customer: domain.Customer) => this.removeCustomer(customer);
        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("EditCustomerController", controller.customer.EditCustomerController);
};