///<reference path="../../reference.d.ts"/>

module d.controller.base{
    export interface ViewModel extends ng.IScope{
        navigator: d.service.contract.NavigatorService;
    }
}