/**
 * Created by lucas on 9/22/13.
 */
///<reference path='./../../../../../../ts-definitions/angularjs/angular.d.ts'/>

import domain = require('./../../domain/User');

export interface AuthService {

    login: (user: domain.User,
        successCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        errorCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
        ) => void;

    logout: (user: domain.User,
        successCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        errorCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
        ) => void;

    isLoggedIn: () => boolean;

    currentUser: () => domain.User;
}