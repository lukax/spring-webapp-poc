///<reference path="../../reference.ts"/>

module entity {
  export class NavigatorServiceImpl implements NavigatorService {

    static $inject = ["$location", "$routeParams", "Progress"];
    constructor(public $location:ng.ILocationService,
                public $routeParams:any,
                public Progress:Progress) {
    }

    public params() {
      return this.$routeParams;
    }

    public url(to:string) {
      this.$location.url(to);
    }
  }
}

angular.module("lwa.entity").service("NavigatorService", entity.NavigatorServiceImpl);
