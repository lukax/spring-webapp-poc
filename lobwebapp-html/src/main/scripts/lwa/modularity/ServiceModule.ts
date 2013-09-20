///<reference path='../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='../../../../../ts-definitions/requirejs/require.d.ts'/>
///<reference path='../service/mock/base/AbstractEntityServiceMock.ts'/>
///<reference path='../service/mock/DefaultProductServiceMock.ts'/>
///<reference path='../service/impl/DefaultProductService.ts'/>
///<reference path='../service/impl/util/DefaultAlertService.ts'/>

import angular = require('angular');
import service_impl_util = require('./../service/impl/util/DefaultAlertService');
import service_mock = require('./../service/mock/DefaultProductServiceMock');

export class ServiceModule{
    private serviceNgModule: ng.IModule;
        
    constructor(){
        this.serviceNgModule = angular.module('lwaServiceModule',[]);
    }
        
    configure(){
        this.serviceNgModule
            .service('_productService', ['$timeout', ($timeout: ng.ITimeoutService) => new service_mock.DefaultProductServiceMock($timeout)])
            .service('_alertService', () => new service_impl_util.DefaultAlertService())
            ;
        return this;
    }
}