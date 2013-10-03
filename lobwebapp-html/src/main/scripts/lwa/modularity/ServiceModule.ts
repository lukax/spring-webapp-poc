///<reference path="./../reference.d.ts"/>
///<amd-dependency path="angular"/>
import a = require('./../service/impl/util/AlertServiceImpl');
import b = require('./../service/mock/ProductServiceMock');
import c = require('./../service/mock/UserServiceMock');
import d = require('./../service/mock/AuthServiceMock');
import e = require('./../service/impl/DependencyServiceImpl');
import f = require('./../service/impl/util/NavigationServiceImpl');

export module modularity {
    export class ServiceModule {
        private serviceNgModule: ng.IModule;

        constructor() {
            this.serviceNgModule = angular.module('lwa.service', []);
        }

        configure() {
            this.serviceNgModule
                .factory('DependencyService', <Function>e.service.impl.DependencyService)
                .service('ProductService', <Function>b.service.mock.DefaultProductService)
                .service('UserService', <Function>c.service.mock.DefaultUserService)
                .service('AuthService', <Function>d.service.mock.DefaultAuthService)
                .service('AlertService', <Function>a.service.impl.util.DefaultAlertService)
                .service('NavigationService', <Function>f.service.impl.util.NavigationSvcImpl)
            ;
            return this;
        }
    }
}