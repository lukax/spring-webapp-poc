///<reference path="./../../reference.d.ts"/>

import svcu = d.service.contract.util;
import p = require("./../../util/Progress");

export module service.impl.util {
    export class NavigationServiceImpl implements d.service.contract.util.NavigationService {

        public progress: d.service.contract.util.Progress;

        static $inject = ["$location", "$stateParams"];
        constructor(public $location: ng.ILocationService, public $stateParams: ng.ui.IStateParams) {
            this.progress = p.util.Progress;
        }

        params() {
            return this.$stateParams;
        }

        navigateTo(url: string){
            this.$location.url(url);
        }
    }
}