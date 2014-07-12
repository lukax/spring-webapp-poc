///<reference path="../../reference.ts"/>

module controller.base{
    export interface IAppScope extends ng.IScope {
        vm: controller.base.IController;
    }
}
