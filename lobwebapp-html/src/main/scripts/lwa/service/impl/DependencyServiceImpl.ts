///<reference path="./../../reference.d.ts"/>

export module service.impl{
    export class DependencyService {
        private q: ng.IQService;
        private rootScope: ng.IRootScopeService;
        private isLoading: boolean;

        static $inject = ['$q', '$rootScope'];
        constructor($q: ng.IQService, $rootScope: ng.IRootScopeService) {
            this.q = $q;
            this.rootScope = $rootScope;
        }

        load(moduleName: string){
            var deferred = this.q.defer();
            if(!this.isLoading){
                this.isLoading = true;
                require([moduleName], () => {
                   this.rootScope.$apply(()=> {
                       deferred.resolve();
                   });
                });
            }
            this.isLoading = false;
            return deferred.promise;
        }

    }
}