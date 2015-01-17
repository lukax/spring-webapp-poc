///<reference path="../../reference.d.ts"/>

class NavigatorServiceImpl implements service.contract.NavigatorService {

    static $inject = ["$location", "$routeParams", "Progress"];
    constructor(public $location: ng.ILocationService,
        public $routeParams: any,
        public Progress: service.contract.Progress) {
    }

    public params() {
        return this.$routeParams;
    }

    public url(to: string) {
        this.$location.url(to);
    }
}
export = NavigatorServiceImpl;