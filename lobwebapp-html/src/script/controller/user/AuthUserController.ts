///<reference path="./../../reference.d.ts"/>

export module controller.user {
    export interface AuthUserViewModel extends d.controller.base.ViewModel {
        user: domain.User;
        login: () => void;
    }

    export class AuthUserController implements d.controller.base.Controller {

        static $inject = ['$scope', 'AuthService', 'AlertService'];
        constructor(public $scope: AuthUserViewModel,
            public AuthService: d.service.contract.AuthService,
            public AlertService: d.service.contract.util.AlertService) {

            this.processArgs();
            this.populateScope();
        }

        login() {
            this.AuthService.login(this.$scope.user,
                (successData) => {
                    this.$scope.navigator.$location.url('/product/list');
                    this.$scope.user = successData;
                    this.AlertService.add({ content: 'Bem vindo ' + this.$scope.user.username });
                },
                () => {
                    this.AlertService.add({ content: 'Usuário ou senha inválido', title: 'Login falhou', type: 'warning' });
                });
        }

        processArgs() {

        }

        populateScope() {
            this.$scope.user = { id: 0, username: '', password: '', roles: [], isLogged: false };
            this.$scope.login = () => this.login();
        }
    }
}

(<any>angular.module('lwa.controller')).lazy.controller('AuthUserController', controller.user.AuthUserController);