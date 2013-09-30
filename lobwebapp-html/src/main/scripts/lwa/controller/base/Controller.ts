///<reference path="./../../reference.d.ts"/>

module d.controller.contract{
    export interface Controller{
        $scope: ng.IScope;
        processArgs(): void;
        populateScope(): void;
    }
}