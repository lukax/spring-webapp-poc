///<reference path="../../reference.d.ts"/>

export module service.impl {
    export class NavigatorServiceImpl implements d.service.contract.NavigatorService {

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