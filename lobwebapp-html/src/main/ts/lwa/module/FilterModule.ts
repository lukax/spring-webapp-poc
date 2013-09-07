///<reference path='../../DefinitelyTyped/angularjs/angular.d.ts'/>

module lwa.module{
    export class FilterModule{
        private filterNgModule: ng.IModule;
        
        constructor(){
            this.filterNgModule = angular.module('lwaFilterModule',[]);
        }
        
        configure(){
            
            return this;
        }
    }
}