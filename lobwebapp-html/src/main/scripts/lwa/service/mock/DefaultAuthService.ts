/**
 * Created by lucas on 9/22/13.
 */

///<reference path='./../../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='./../../domain/base/AbstractEntity.ts'/>
///<reference path='./../../domain/Product.ts'/>
///<reference path='./../contract/AuthService.ts'/>
///<reference path='./../contract/base/EntityService.ts'/>
///<reference path='./../contract/ProductService.ts'/>
///<reference path='./base/AbstractEntityService.ts'/>

import dom_usr = require('./../../domain/User');
import svc_us = require('./DefaultUserService');
import svc_ct_as = require('./../contract/AuthService');

export class DefaultAuthService implements svc_ct_as.AuthService {
    private timeoutService: ng.ITimeoutService;
    private userService: svc_us.DefaultUserService;
    private user: dom_usr.User;

    static $inject = ['$timeout', 'UserService'];
    constructor($timeout: ng.ITimeoutService, UserService: svc_us.DefaultUserService){
        this.timeoutService = $timeout;
        this.userService = UserService;
        this.user = new dom_usr.User(0,'Visitante','',null);
    }

    login (user: dom_usr.User,
        successCallback: (data: dom_usr.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        errorCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any)
    {
        this.userService.findByUsername(user.username,
            (x: dom_usr.User) => {
                if(x.password === user.password) {
                    this.user = user;
                    this.user.isLogged = true;
                    successCallback(this.user, 200, null, null);
                }
                else{
                    errorCallback(false, 200, null, null);
                }
            }, () => {
                errorCallback(false, 200, null, null);
            });
    }

    logout (user: dom_usr.User,
        successCallback: (data: dom_usr.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        errorCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any)
    {
        this.userService.findByUsername(user.username,
            (x: dom_usr.User) => {
                if(x.password === user.password) {
                    this.temporaryUser();
                    successCallback(this.user, 200, null, null);
                    return;
                }
                errorCallback(false, 200, null, null);                
            }, ()=> {
                errorCallback(false, 200, null, null);
            }
        );
    }

    isLoggedIn (){
        return this.user.isLogged;
    }

    currentUser () {
        return this.user;
    }

    private temporaryUser() {
        this.user = new dom_usr.User(0, 'Visitante', '', null);
    }

}
