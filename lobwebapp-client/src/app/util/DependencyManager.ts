///<reference path="../reference.ts"/>

declare var require:any;

module util {
  export class DependencyManager {

    constructor(public $q:ng.IQService, public $rootScope:ng.IRootScopeService, public Progress:service.contract.Progress) {

    }

    public resolve(paths:string[], moduleName:string):ng.IPromise<any[]> {
      var deferred = this.$q.defer();
      this.Progress.start();

      if (moduleName) {
        paths.forEach((x:string) => {
          require([x], (dep) => {
            if (dep.register) dep.register(moduleName);
          });
        });
      }

      require(paths, () => {
        this.$rootScope.$apply(() => {
          this.Progress.done();
          deferred.resolve(arguments);
        });
      });

      return deferred.promise;
    }
  }
}
