///<reference path='./../../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='./../../../../../../ts-definitions/requirejs/require.d.ts'/>
///<reference path='./../../domain/User.ts'/>
///<reference path='./../../service/contract/ProductService.ts'/>
///<reference path='./../../service/mock/DefaultUserService.ts'/>
///<reference path='./../../service/contract/util/AlertService.ts'/>
///<reference path='./../../util/Std.ts'/>

import domain_usr = require('./../../domain/User');
import service_au = require('./../../service/contract/AuthService')
import service_al = require('./../../service/contract/util/AlertService');

export interface AuthUserViewModel extends ng.IScope {
    user: domain_usr.User;
    login: () => void;
}

export class AuthUserController {
    private scope: AuthUserViewModel;
    private authService: service_au.AuthService;
    private alertService: service_al.AlertService;
    private locationService: ng.ILocationService;
        
	static $inject = ['$scope', 'AuthService', 'AlertService', '$location'];
    constructor($scope: AuthUserViewModel,
                AuthService: service_au.AuthService,
                AlertService: service_al.AlertService,
                $location: ng.ILocationService){
        this.scope = $scope;
        this.authService = AuthService;
        this.alertService = AlertService;
        this.locationService = $location;

        this.populateScope();
    }

    populateScope(){
        this.scope.user = new domain_usr.User(0,'','',domain_usr.UserRole.client);
        this.scope.login = () => { this.login(); }
    }

    login(){
        this.authService.login(this.scope.user, ()=> { this.locationService.url('/product/list'); }, () => { alert('Error'); });
    }
}