///<reference path="./../reference.d.ts"/>
///<amd-dependency path="angular"/>
import a = require('./../service/impl/util/DefaultAlertServiceImpl');
import b = require('./../service/mock/DefaultProductServiceMock');
import c = require('./../service/mock/DefaultUserServiceMock');
import d = require('./../service/mock/DefaultAuthServiceMock');
import e = require('./../service/impl/DefaultDependencyServiceImpl');
import f = require('./../service/impl/util/NavigationSvcImpl');

export module modularity {
    export class ServiceModule {
        private serviceNgModule: ng.IModule;

        constructor() {
            this.serviceNgModule = angular.module('lwaServiceModule', []);
        }

        configure() {
            this.serviceNgModule
                .factory('DependencyService', <Function>e.service.impl.DependencyService)
                .service('ProductService', <Function>b.service.mock.DefaultProductService)
                .service('UserService', <Function>c.service.mock.DefaultUserService)
                .service('AuthService', <Function>d.service.mock.DefaultAuthService)
                .service('AlertService', <Function>a.service.impl.util.DefaultAlertService)
                .service('NavigationSvc', <Function>f.service.impl.util.NavigationSvcImpl)
            ;
            return this;
        }
    }
}