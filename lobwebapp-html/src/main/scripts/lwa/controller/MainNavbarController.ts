///<reference path="./../reference.d.ts"/>

export module controller {
    export interface MainNavbarViewModel extends ng.IScope {
        user: domain.User;
        username: string;
        logout: () => void;
    }

    export class MainNavbarController implements d.controller.contract.Controller{

        static $inject = ['$scope', 'AuthService', 'NavigationSvc', 'AlertService', '$rootScope'];
        constructor(public $scope: MainNavbarViewModel,
                    public AuthService: d.service.contract.AuthService,
                    public NavigationSvc: d.service.contract.util.NavigationSvc,
                    public AlertService: d.service.contract.util.AlertService,
                    public $rootScope: ng.IRootScopeService ) {

            this.processArgs();
            this.populateScope();
        }

        logout(){
            this.AuthService.logout(this.$scope.user,
                (successData) => {
                    this.AlertService.add(this.$scope.user.username + ' saiu', String(successData));
                    this.$scope.user = successData;
                    this.NavigationSvc.$location.url('/user/auth');
                },
                (errorData, errorStatus) => {
                    this.AlertService.add('Não foi possível sair', String(errorStatus), 'warning'); });
        }

        setupUsername(){
            this.$scope.$watch('user', (newValue: domain.User, oldValue: domain.User) => {
                if(newValue.username == '') this.$scope.username = 'Visitante';
                else this.$scope.username = newValue.username;
            });
        }

        temporaryUser() {
            this.$scope.username = 'Visitante';
            this.$scope.user = { id: 0, username: '', password: '', isLogged: false, role: null };
        }

        processArgs(){

        }

        populateScope(){
            this.$rootScope.$on('USER_CHANGED', (x, users) => { this.$scope.user = users[0]; });
            this.$scope.logout = () => this.logout();
            this.temporaryUser();
            this.setupUsername();
        }

    }
}