///<reference path="./../../reference.d.ts"/>

export module service.impl{
    export class DependencyService {
        private loaded: Array<string>;

        static $inject = ['$q', '$rootScope', '$timeout'];
        constructor(public $q: ng.IQService, public $rootScope: ng.IRootScopeService, public $timeout: ng.ITimeoutService) {

        }

        load(moduleName: string){
            var deferred = this.$q.defer();
            if(this.loaded.indexOf(moduleName) === -1){
                this.loaded.push(moduleName);
                require([moduleName], () => {
                   this.$rootScope.$apply(()=> {
                       deferred.resolve();
                   });
                });
            }
            else{
                deferred.reject();
            }
            return deferred.promise;
        }

    }
}