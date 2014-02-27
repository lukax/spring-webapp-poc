///<reference path="../reference.d.ts"/>

export module util {
    export class DependencyManager {

        constructor(public $q: ng.IQService, 
                    public $rootScope: ng.IRootScopeService,
                    public Progress: d.service.contract.Progress) {

        }

        public resolve(paths: string[], moduleName: string) {
            var deferred = this.$q.defer();
            this.Progress.start();

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
                    this.Progress.done();
                    deferred.resolve();
                });
            });

            return deferred.promise;
        }
    }
}