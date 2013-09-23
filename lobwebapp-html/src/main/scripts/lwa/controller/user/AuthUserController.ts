///<reference path='./../../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='./../../../../../../ts-definitions/requirejs/require.d.ts'/>
///<reference path='./../../domain/User.ts'/>
///<reference path='./../../service/contract/ProductService.ts'/>
///<reference path='./../../service/mock/DefaultUserService.ts'/>
///<reference path='./../../service/contract/util/AlertService.ts'/>
///<reference path='./../../util/Std.ts'/>

import dom_usr = require('./../../domain/User');
import svc_ct_as = require('./../../service/contract/AuthService')
import svc_util_as = require('./../../service/contract/util/AlertService');

export interface AuthUserViewModel extends ng.IScope {
    user: dom_usr.User;
    login: () => void;
    logout: () => void;
}

export class AuthUserController {
    private scope: AuthUserViewModel;
    private authService: svc_ct_as.AuthService;
    private alertService: svc_util_as.AlertService;
    private locationService: ng.ILocationService;
        
	static $inject = ['$scope', 'AuthService', 'AlertService', '$location'];
    constructor($scope: AuthUserViewModel,
                AuthService: svc_ct_as.AuthService,
                AlertService: svc_util_as.AlertService,
                $location: ng.ILocationService){
        this.scope = $scope;
        this.authService = AuthService;
        this.alertService = AlertService;
        this.locationService = $location;

        this.populateScope();
    }

    populateScope(){
        this.scope.user = new dom_usr.User(0, 'Visitante', '', dom_usr.UserRole.client);
        this.scope.login = () => { this.login(); }
        this.scope.logout = () => { this.logout(); }
    }

    login(){
        this.authService.login(this.scope.user,
            (successData) => {
                this.locationService.url('/product/list');
                this.scope.user = successData;
                this.alertService.add('Bem vindo ' + this.scope.user.username);
            },
            () => {
                this.alertService.add('Usuário ou senha inválido', 'Login falhou', domain.util.AlertType.warning);
            });
    }

    logout() {
        this.authService.logout(this.scope.user,
            (successData) => {
                this.locationService.url('/user/auth');
                this.scope.user = successData;
                this.alertService.add(this.scope.user.username + ' saiu');
            },
            (errorData, errorStatus) => {
                this.alertService.add('Não foi possível sair', String(errorStatus), domain.util.AlertType.warning);
            });
    }
}