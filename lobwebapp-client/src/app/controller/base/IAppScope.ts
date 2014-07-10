///<reference path="../../reference.ts"/>

module controller.base{
    export interface IAppScope extends ng.IScope {
        navigator: service.contract.NavigatorService;
        vm: controller.base.IController;
    }
}