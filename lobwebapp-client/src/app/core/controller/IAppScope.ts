///<reference path="../../reference.ts"/>

module core {
    export interface IAppScope extends ng.IScope {
        vm: core.IController;
    }
}
