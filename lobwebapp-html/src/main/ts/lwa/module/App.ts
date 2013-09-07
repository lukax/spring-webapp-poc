///<reference path='../../DefinitelyTyped/angularjs/angular.d.ts'/>

module lwa.module{
    import controller = lwa.controller;
    import module = lwa.module;
    
    export class App {
        private appNgModule: ng.IModule;
        private controllerModule: module.ControllerModule;
        private directiveModule: module.DirectiveModule;
        private filterModule: module.FilterModule;
        
        constructor() {
            this.directiveModule = new module.DirectiveModule().configure();
            this.filterModule = new module.FilterModule().configure();
            this.controllerModule = new module.ControllerModule().configure();
            this.appNgModule = angular.module('lwa', ['lwaDirectiveModule','lwaFilterModule','lwaControllerModule']);
        }
    }
}