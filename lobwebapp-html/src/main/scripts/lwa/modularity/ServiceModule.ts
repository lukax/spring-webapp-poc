///<reference path='../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='../service/mock/base/AbstractEntityServiceMock.ts'/>
///<reference path='../service/mock/DefaultProductServiceMock.ts'/>
///<reference path='../service/impl/DefaultProductService.ts'/>
///<reference path='../service/impl/util/DefaultAlertService.ts'/>

module lwa.modularity{
    export class ServiceModule{
        private serviceNgModule: ng.IModule;
        
        constructor(){
            this.serviceNgModule = angular.module('lwaServiceModule',[]);
        }
        
        configure(){
            this.serviceNgModule
                .service('_productService', ['$timeout', ($timeout: ng.ITimeoutService) => new service.mock.DefaultProductServiceMock($timeout)])
                .service('_alertService', () => new service.impl.util.DefaultAlertService())
                ;
            return this;
        }
    }
}