///<reference path="./../reference.d.ts"/>

import p = require("./Progress");

export module util {
    export class DependencyManager {

        constructor(public $q: ng.IQService, public $rootScope: ng.IRootScopeService) {

        }

        public resolve(paths: string[], registerProvider: any) {
            var deferred = this.$q.defer();
            p.util.Progress.start();

            if (registerProvider) {
                paths.forEach((x: string) => {
                    require([x], (dep) => {
                        if (dep.register) dep.register(registerProvider);
                    });
                });
            }

            require(paths, (deps) => {
                this.$rootScope.$apply(() => {
                    console.log("Dependency Manager: resolved " + paths);
                    p.util.Progress.done();
                    deferred.resolve();
                });
            });

            return deferred.promise;
        }
    }
}