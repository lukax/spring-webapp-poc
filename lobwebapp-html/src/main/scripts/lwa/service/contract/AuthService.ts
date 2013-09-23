/**
 * Created by lucas on 9/22/13.
 */
///<reference path='./../../../../../../ts-definitions/angularjs/angular.d.ts'/>

import dom_usr = require('./../../domain/User');

export interface AuthService {

    login: (user: dom_usr.User,
        successCallback: (data: dom_usr.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        errorCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
        ) => void;

    logout: (user: dom_usr.User,
        successCallback: (data: dom_usr.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        errorCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
        ) => void;

    currentUser: () => dom_usr.User;
    isLoggedIn: () => boolean;
}