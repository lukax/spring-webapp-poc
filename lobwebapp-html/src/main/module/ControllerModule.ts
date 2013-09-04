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
        private controllerModule: ng.IModule;
        
        constructor(){
            this.controllerModule = angular.module('lwaControllerModule',['lwaServiceModule']);
        }
        
        configure(){
            this.controllerModule
                .controller('ListProductCtrl', ['$scope', '$location', '_productService', '_alertService', controller.ListProductController])        
                .controller('EditProductCtrl', ['$scope', '$location', '$routeParams', '$modal', '_productService', '_alertService', controller.EditProductController])
                ;
            return this;
        }
    }
}