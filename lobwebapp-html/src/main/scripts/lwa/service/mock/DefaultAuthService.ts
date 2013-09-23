/**
 * Created by lucas on 9/22/13.
 */

///<reference path='./../../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='./../../domain/base/AbstractEntity.ts'/>
///<reference path='./../../domain/Product.ts'/>
///<reference path='./../contract/base/EntityService.ts'/>
///<reference path='./../contract/ProductService.ts'/>
///<reference path='./base/AbstractEntityService.ts'/>

import domain = require('./../../domain/User');
import service_user = require('./DefaultUserService');
import service_contract = require('./../contract/AuthService');

export class DefaultAuthService implements service_contract.AuthService {
    private timeoutService: ng.ITimeoutService;
    private userService: service_user.DefaultUserService;
    public user: domain.User;
    private isLogged: boolean;

    static $inject = ['$timeout', 'UserService'];
    constructor($timeout: ng.ITimeoutService, UserService: service_user.DefaultUserService){
        this.timeoutService = $timeout;
        this.userService = UserService;
        this.isLogged = false;
        this.user = new domain.User(0,'Visitante','',null);
    }

    login (user: domain.User,
        successCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        errorCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any)
    {
        this.userService.findByUsername(user.username, (xUser: domain.User) => {
            if(xUser.password === user.password) {
                this.user = user;
                this.isLogged = true;
                successCallback(true, 200, null, null);
            }
            else{
                this.isLogged = false;
                errorCallback(false, 200, null, null);
            }
        }, ()=> {});
    }

    logout (user: domain.User,
        successCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        errorCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any)
    {
        this.userService.contains(user,
            ()=> {
                this.user = new domain.User(0,'','',null);
                this.isLogged = false;
            }, ()=> {

            }
        );
    }

    isLoggedIn (){
        return this.isLogged;
    }

    currentUser () {
        return this.user;
    }
}
