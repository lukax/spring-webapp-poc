///<reference path='../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../controller/ListProductController.ts'/>
///<reference path='../service/contract/base/EntityService.ts'/>
///<reference path='../service/contract/ProductService.ts'/>
///<reference path='../service/contract/util/AlertService.ts'/>
///<reference path='../service/mock/base/AbstractEntityServiceMock.ts'/>
///<reference path='../service/mock/DefaultProductServiceMock.ts'/>
///<reference path='../service/impl/util/DefaultAlertService.ts'/>

module module{
    export class ServiceModule{
        private serviceModule: ng.IModule;
        
        constructor(){
            this.serviceModule = angular.module('lwaServiceModule',[]);
        }
        
        configure(){
            this.serviceModule
                .service('_productService', ['$timeout', ($timeout: ng.ITimeoutService) => new service.mock.DefaultProductServiceMock($timeout)])
                .service('_alertService', () => new service.impl.util.DefaultAlertService())
                ;
            return this;
        }
    }
}