///<reference path="./../../reference.d.ts"/>

module d.controller.base{
    export interface Controller{
        $scope: ng.IScope;
        processArgs(): void;
        populateScope(): void;
    }
}