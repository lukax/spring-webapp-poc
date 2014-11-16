///<reference path="../reference.d.ts"/>

class DependencyManager {
    static registered: string[] = [];

    constructor(public $q: ng.IQService, public $rootScope: ng.IRootScopeService, public Progress: service.contract.Progress) {

    }

    public resolve(paths: string[], lazyModule: ng.ILazyModule) {
        var deferred = this.$q.defer();
        this.Progress.start();

        if (!this.done(paths, deferred)) {
            paths.forEach((path) => {
                if (DependencyManager.registered.indexOf(path) === -1) {
                    require([path], (dep) => {
                        if (dep.register) {
                            dep.register(lazyModule);
                            DependencyManager.registered.push(path);
                        }
                        else
                            console.log("[WARN]: Loaded module " + path + " does not have the register function");
                        this.done(paths, deferred);
                    });
                }
            });
        }
        return deferred.promise;
    }

    done(paths: string[], deferred: ng.IDeferred<any>) {
        var isPathMissing = paths.some((x) => {
            return (DependencyManager.registered.indexOf(x) === -1);
        });
        if (!isPathMissing) {
            var whenDone = () => {
                deferred.resolve();
                this.Progress.done();
            };
            if (this.$rootScope.$$phase == '$apply' || this.$rootScope.$$phase == '$digest')
                whenDone();
            else
                this.$rootScope.$apply(() => {
                    whenDone();
                });
        }
        return !isPathMissing;
    }

}
export = DependencyManager;