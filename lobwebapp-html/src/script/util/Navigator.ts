///<reference path="../reference.d.ts"/>

export module util {
    export class Navigator implements d.service.contract.Navigator {

        static $inject = ["$location", "$routeParams", "Progress"];
        constructor(public $location: ng.ILocationService, 
                    public $routeParams: any,
                    public Progress: d.service.contract.Progress) {
        }

        public params() {
        	return this.$routeParams;
        }

        public url(to : string){
        	this.$location.url(to);
        }
    }
}