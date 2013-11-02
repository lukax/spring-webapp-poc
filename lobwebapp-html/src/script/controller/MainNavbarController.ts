///<reference path="./../reference.d.ts"/>

export module controller {
    export interface MainNavbarViewModel extends d.controller.base.ViewModel {
        user: domain.User;
        username: string;
        logout: () => void;
    }

    export class MainNavbarController implements d.controller.base.Controller{

        static $inject = ['$scope', 'AuthService', 'AlertService', '$rootScope'];
        constructor(public $scope: MainNavbarViewModel,
                    public AuthService: d.service.contract.AuthService,
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
                    this.$scope.navigator.$location.url('/user/auth');
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