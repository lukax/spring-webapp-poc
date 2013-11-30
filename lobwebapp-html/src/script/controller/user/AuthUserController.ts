///<reference path="./../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");

export module controller.user {
    export interface AuthUserViewModel extends d.controller.base.ViewModel {
        user: domain.User;
        login: () => void;
    }

    export class AuthUserController implements d.controller.base.Controller {

        static $inject = ["$scope", "AuthService", "AlertService", "NavigationService"];
        constructor(public $scope: AuthUserViewModel,
            public AuthService: d.service.contract.AuthService,
            public AlertService: d.service.contract.util.AlertService,
            public NavigationService: d.service.contract.util.NavigationService) {

            this.processArgs();
            this.populateScope();
        }

        login() {
            this.AuthService.login(this.$scope.user,
                (successData) => {
                    this.NavigationService.navigateTo("/product/list");
                    this.AlertService.add({ title: "Login", content: "Bem vindo " + successData.name });
                },
                () => {
                    this.AlertService.add({ title: "Login", content: "Usuário ou senha inválido", type: enums.AlertType.WARNING });
                });
        }

        logout() {
            this.AuthService.logout(
                (successData) => {
                    this.AlertService.add({ title: "Logout", content: successData.name + " saiu" });
                    this.$scope.user = successData;
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ title: "Logout", content: String(errorData.description), type: enums.AlertType.WARNING });
                });
        }

        processArgs() {
            var error = this.NavigationService.params().error;
            var logout = this.NavigationService.params().logout;
            switch (error) {
                case "0":
                    this.AlertService.add({ content: "Login ou senha Inválido", type: enums.AlertType.WARNING });
                    break;
                case "1":
                    this.AlertService.add({ content: "Usuário não possui permissão para acessar esta página", type: enums.AlertType.WARNING });
                    break;
                default:
                    if (this.AuthService.isLoggedIn()) {
                        this.NavigationService.navigateTo("/product/list");
                    }
                    break;
            }

            if (logout == "true") {
                this.logout();
            }
        }

        populateScope() {
            this.$scope.user = { id: 0, username: "", password: "", roles: [], name: "" };
            this.$scope.login = () => this.login();

        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("AuthUserController", controller.user.AuthUserController);
};