///<reference path='../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='ControllerModule.ts'/>
///<reference path='DirectiveModule.ts'/>
///<reference path='FilterModule.ts'/>

//require([
//    'angular',
//    'angularRoute',
//    'angularUi',
//    'angularUiBootstrap',
//    'angularStrap',
//    'lib/ekathuwa'
//]);

module lwa.modularity{

    export class App {
        private appNgModule: ng.IModule;
        private controllerModule: modularity.ControllerModule;
        private directiveModule: modularity.DirectiveModule;
        private filterModule: modularity.FilterModule;
        
        constructor() {
            
            this.directiveModule = new modularity.DirectiveModule().configure();
            this.controllerModule = new modularity.ControllerModule().configure();
            this.filterModule = new modularity.FilterModule().configure();
            this.appNgModule = angular.module('lwa', ['lwaDirectiveModule','lwaFilterModule','lwaControllerModule']);
        }
    }
}