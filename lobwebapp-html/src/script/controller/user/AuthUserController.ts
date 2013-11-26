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
                    this.$scope.navigator.$location.url("/product/list");
                    this.$scope.user = successData;
                    this.AlertService.add({ title: "Login", content: "Bem vindo " + this.$scope.user.name });
                },
                () => {
                    this.AlertService.add({ title: "Login", content: "Usuário ou senha inválido", type: enums.AlertType.WARNING });
                });
        }

        temporaryUser() {
            this.$scope.user = { id: 0, username: "", password: "", roles: [], name: "" };
        }

        processArgs() {
            var error = this.NavigationService.params().error;
            var logout = this.NavigationService.params().logout;
            if (error == "0") {
                this.AlertService.add({ content: "Login ou senha Inválido", type: enums.AlertType.WARNING });
            }
            else if (error == "1") {
                this.AlertService.add({ content: "Usuário não possui permissão para acessar esta página", type: enums.AlertType.WARNING });
            }
            if(logout == "true"){
                this.AlertService.add({ content: "Você fez logout com sucesso" });
            }
        }

        populateScope() {
            this.temporaryUser();
            this.$scope.login = () => this.login();
        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("AuthUserController", controller.user.AuthUserController);
};