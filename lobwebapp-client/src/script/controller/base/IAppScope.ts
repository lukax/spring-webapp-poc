///<reference path="../../reference.d.ts"/>

module d.controller.base{
    export interface IAppScope extends ng.IScope {
        navigator: d.service.contract.NavigatorService;
        vm: d.controller.base.IController;
    }
}