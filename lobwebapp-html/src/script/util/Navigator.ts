///<reference path="../reference.d.ts"/>

export module util {
    export class Navigator implements d.service.contract.Navigator {

        static $inject = ["$location", "$stateParams", "Progress"];
        constructor(public $location: ng.ILocationService, 
                    public $stateParams: ng.ui.IStateParams,
                    public Progress: d.service.contract.Progress) {
            
        }
    }
}