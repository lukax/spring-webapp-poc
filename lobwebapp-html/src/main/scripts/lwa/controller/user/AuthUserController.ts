///<reference path="./../../reference.d.ts"/>

export module controller.user {
    export interface AuthUserViewModel extends ng.IScope {
        user: domain.User;
        login: () => void;
        logout: () => void;
    }

    export class AuthUserController {

        static $inject = ['$scope', 'AuthService', 'AlertService', 'NavigationSvc'];
        constructor(public $scope: AuthUserViewModel,
                    public AuthService: d.service.contract.AuthService,
                    public AlertService: d.service.contract.util.AlertService,
                    public NavigationSvc: d.service.contract.util.NavigationSvc) {

            this.populateScope();
        }

        populateScope() {
            this.$scope.user = { id: 0, username: '', password: '', role: '', isLogged:false };
            this.$scope.login = () => { this.login(); }
            this.$scope.logout = () => { this.logout(); }
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

        logout() {
            this.AuthService.logout(this.$scope.user,
                (successData) => {
                    this.NavigationSvc.$location.url('/user/auth');
                    this.$scope.user = successData;
                    this.AlertService.add(this.$scope.user.username + ' saiu');
                },
                (errorData, errorStatus) => {
                    this.AlertService.add('Não foi possível sair', String(errorStatus), 'warning');
                });
        }
    }
}