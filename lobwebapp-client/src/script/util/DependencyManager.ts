///<reference path="../reference.d.ts"/>

export module util {
    export class DependencyManager {

        constructor(public $q: ng.IQService,
                    public $rootScope: ng.IRootScopeService,
                    public Progress: d.service.contract.Progress) {

        }

        public resolve(paths: string[], module: ng.ILazyModule) {
            var deferred = this.$q.defer();
            this.Progress.start();

            if (module) {
                paths.forEach((x: string) => {
                    require([x], (dep) => {
                        if (dep.register) dep.register(module);
                    });
                });
            }

            require(paths, () => {
                this.$rootScope.$apply(() => {
                    this.Progress.done();
                    deferred.resolve();
                });
            });

            return deferred.promise;
        }
    }
}
