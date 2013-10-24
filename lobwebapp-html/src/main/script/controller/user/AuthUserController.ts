///<reference path="./../../reference.d.ts"/>

export module controller.user {
    export interface AuthUserViewModel extends d.controller.base.BaseViewModel {
        user: domain.User;
        login: () => void;
    }

    export class AuthUserController implements d.controller.base.Controller{

        static $inject = ['$scope', 'AuthService', 'AlertService', 'NavigationService'];
        constructor(public $scope: AuthUserViewModel,
                    public AuthService: d.service.contract.AuthService,
                    public AlertService: d.service.contract.util.AlertService,
                    public NavigationSvc: d.service.contract.util.NavigationService) {

            this.processArgs();
            this.populateScope();
        }

        login() {
            this.AuthService.login(this.$scope.user,
                (successData) => {
                    this.NavigationSvc.$location.url('/product/list');
                    this.$scope.user = successData;
                    this.AlertService.add('Bem vindo ' + this.$scope.user.username);
                },
                () => {
                    this.AlertService.add('Usuário ou senha inválido', 'Login falhou', 'warning');
                });
        }

        processArgs(){
            
        }

        populateScope() {
            this.$scope.user = { id: 0, username: '', password: '', role: '', isLogged:false };
            this.$scope.login = () => this.login();
        }
    }
}

(<any>angular.module('lwa.controller')).lazy.controller('AuthUserController', controller.user.AuthUserController);