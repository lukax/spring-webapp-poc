///<reference path='./../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='./../../../../../ts-definitions/requirejs/require.d.ts'/>
///<reference path='./../service/mock/base/AbstractEntityService.ts'/>
///<reference path='./../service/mock/DefaultProductService.ts'/>
///<reference path='./../service/impl/DefaultProductService.ts'/>
///<reference path='./../service/impl/util/DefaultAlertService.ts'/>

import angular = require('angular');
import service_impl_al = require('./../service/impl/util/DefaultAlertService');
import service_mock_pr = require('./../service/mock/DefaultProductService');
import service_mock_us = require('./../service/mock/DefaultUserService');
import service_mock_au = require('./../service/mock/DefaultAuthService');
import service_impl_de = require('./../service/impl/DefaultDependencyService');

export class ServiceModule{
    private serviceNgModule: ng.IModule;
        
    constructor(){
        this.serviceNgModule = angular.module('lwaServiceModule',[]);
    }
        
    configure(){
        this.serviceNgModule
            .service('DependencyService', service_impl_de.DependencyService)
            .service('ProductService', service_mock_pr.DefaultProductService)
            .service('UserService', service_mock_us.DefaultUserService)
            .service('AuthService', service_mock_au.DefaultAuthService)
            .service('AlertService', service_impl_al.DefaultAlertService)
            ;
        return this;
    }
}