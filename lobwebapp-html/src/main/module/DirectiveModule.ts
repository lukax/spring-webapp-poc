///<reference path='../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../controller/ListProductController.ts'/>
///<reference path='../service/contract/base/EntityService.ts'/>
///<reference path='../service/contract/ProductService.ts'/>
///<reference path='../service/contract/util/AlertService.ts'/>
///<reference path='../service/mock/base/AbstractEntityServiceMock.ts'/>
///<reference path='../service/mock/DefaultProductServiceMock.ts'/>
///<reference path='../service/impl/util/DefaultAlertService.ts'/>

module module{
    export class DirectiveModule{
        private directiveNgModule: ng.IModule;
        private lobProgressDirective = () => {
                return { 
                        replace:true,
                        transclude:true,
                        restrict:"E",
                        template:
                            '<div class="progress progress-striped active">'
                              +'<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">'
                              +'</div>'
                          +'</div>'
                    }
        };
        
        constructor(){
            this.directiveNgModule = angular.module('lwDirectiveModule',[]);
        }
        
        configure(){
            this.directiveNgModule
                .directive('lwProgress', this.lobProgressDirective)
                ;
            return this;
        }
    }
}