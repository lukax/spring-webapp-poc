///<reference path="./../../reference.d.ts"/>

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
                    this.AlertService.add({ content: "Bem vindo " + this.$scope.user.name });
                },
                () => {
                    this.AlertService.add({ content: "Usuário ou senha inválido", title: "Login falhou", type: "warning" });
                });
        }

        temporaryUser() {
            this.$scope.user = { id: 0, username: "", password: "", isLogged: false, roles: [], name: "Visitante" };
        }

        processArgs() {
            var error = this.NavigationService.params().error;
            var logout = this.NavigationService.params().logout;
            if (error == "0") {
                this.AlertService.add({ content: "Login ou senha Inválido", type: "warning" });
            }
            else if (error == "1") {
                this.AlertService.add({ content: "O usuario não possui permissão para acessar esta página", type: "warning" });
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