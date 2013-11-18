///<reference path="./../../reference.d.ts"/>

export module controller.user {
    export interface AuthUserViewModel extends d.controller.base.ViewModel {
        user: domain.User;
        login: () => void;
    }

    export class AuthUserController implements d.controller.base.Controller {

        static $inject = ["$scope", "AuthService", "AlertService"];
        constructor(public $scope: AuthUserViewModel,
            public AuthService: d.service.contract.AuthService,
            public AlertService: d.service.contract.util.AlertService) {

            this.populateScope();
        }

        login() {
            this.AuthService.login(this.$scope.user,
                (successData) => {
                    this.$scope.navigator.$location.url("/product/list");
                    this.$scope.user = successData;
                    this.AlertService.add({ content: "Bem vindo " + this.$scope.user.firstName + " " + this.$scope.user.lastName });
                },
                () => {
                    this.AlertService.add({ content: "Usuário ou senha inválido", title: "Login falhou", type: "warning" });
                });
        }

        temporaryUser() {
            this.$scope.user = { id: 0, username: "", password: "", isLogged: false, roles: [], firstName: "Visitante", lastName: "" };
        }

        processArgs() {
            
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