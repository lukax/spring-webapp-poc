///<reference path="../reference.d.ts"/>

import p = require("./Progress");

export module util {
    export class DependencyManager {

        constructor(public $q: ng.IQService, public $rootScope: ng.IRootScopeService) {

        }

        public resolve(paths: string[], moduleName: string) {
            var deferred = this.$q.defer();
            p.util.Progress.start();

            if (moduleName) {
                paths.forEach((x: string) => {
                    require([x], (dep) => {
                        if (dep.register) dep.register(moduleName);
                    });
                });
            }

            require(paths, () => {
                this.$rootScope.$apply(() => {
                    console.log("Resolved: " + paths.join(", "));
                    p.util.Progress.done();
                    deferred.resolve();
                });
            });

            return deferred.promise;
        }
    }
}