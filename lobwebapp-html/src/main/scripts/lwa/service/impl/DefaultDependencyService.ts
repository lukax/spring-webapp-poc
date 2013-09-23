/**
 * Created by lucas on 9/23/13.
 */
///<reference path='./../../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='./../../../../../../ts-definitions/requirejs/require.d.ts'/>

export class DependencyService {
    private q: ng.IQService;
    private rootScope: ng.IRootScopeService;

    static $inject = ['$q', '$rootScope'];
    constructor($q: ng.IQService, $rootScope: ng.IRootScopeService) {
        this.q = $q;
        this.rootScope = $rootScope;
    }

    load(moduleName: string){
        var deferred = this.q.defer();
        require([moduleName], () => {
           this.rootScope.$apply(()=> {
               deferred.resolve();
           });
        });

        return deferred.promise;
    }

}