///<reference path="../reference.d.ts"/>

import _ = require("underscore");

export module modularity {
    export class UtilModule {
        private module: ng.IModule;

        constructor() {
            this.module = angular.module('lwa.util', []);
        }

        configure() {
            this.module
                .constant("_", _)
            ;
            return this;
        }

    }
}