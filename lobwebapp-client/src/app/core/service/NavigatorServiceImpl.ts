///<reference path="../../reference.ts"/>

module core {
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

core.module.service("NavigatorService", core.NavigatorServiceImpl);
