///<reference path="./../reference.d.ts"/>

export module controller {
    export interface MainNavbarViewModel extends ng.IScope {
        user: domain.User;
        username: string;
        logout: () => void;
    }

    export class MainNavbarController {

        static $inject = ['$scope', 'AuthService', 'NavigationSvc', '$rootScope'];
        constructor(public $scope: MainNavbarViewModel,
                    public AuthService: d.service.contract.AuthService,
                    public NavigationSvc: d.service.contract.util.NavigationSvc,
                    public $rootScope: ng.IRootScopeService ) {

            this.temporaryUser();
            this.$rootScope.$on('USER_CHANGED', (x, users) => { this.$scope.user = users[0]; });

            this.$scope.logout = () => {
                this.AuthService.logout(this.$scope.user,
                    (successData) => {
                        this.$scope.user = successData;
                        this.NavigationSvc.$location.url('/user/auth'); },
                    (errorData) => {
                        alert('Erro ao sair'); });
            }

            this.$scope.$watch('user', (newValue: domain.User, oldValue: domain.User) => {
                if(newValue.username == '') this.$scope.username = 'Visitante';
                else this.$scope.username = newValue.username;
            });
        }

        temporaryUser() {
            this.$scope.username = 'Visitante';
            this.$scope.user = { id: 0, username: '', password: '', isLogged: false, role: null };
        }

    }
}