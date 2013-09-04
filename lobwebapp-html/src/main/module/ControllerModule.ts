///<reference path='../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../controller/ListProductController.ts'/>
///<reference path='../service/contract/base/EntityService.ts'/>
///<reference path='../service/contract/ProductService.ts'/>
///<reference path='../service/contract/util/AlertService.ts'/>
///<reference path='../service/mock/base/AbstractEntityServiceMock.ts'/>
///<reference path='../service/mock/DefaultProductServiceMock.ts'/>
///<reference path='../service/impl/util/DefaultAlertService.ts'/>

module module{
    export class ControllerModule{
        private controllerNgModule: ng.IModule;
        private serviceModule: module.ServiceModule;

        constructor(){
            this.serviceModule = new module.ServiceModule().configure();
            this.controllerNgModule = angular.module('lwControllerModule',['lwServiceModule']);
        }
        
        configure(){
            this.controllerNgModule
                .controller('ListProductCtrl', ['$scope', '$location', '_productService', '_alertService', controller.ListProductController])        
                .controller('EditProductCtrl', ['$scope', '$location', '$routeParams', '$modal', '_productService', '_alertService', controller.EditProductController])
                ;
            return this;
        }
    }
}