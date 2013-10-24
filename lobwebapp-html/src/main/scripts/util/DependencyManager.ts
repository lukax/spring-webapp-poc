///<reference path="./../reference.d.ts"/>

import p = require('./Progress');

export module util {
    export class DependencyManager {

        constructor(public $q: ng.IQService, public $rootScope: ng.IRootScopeService){

        }

        public resolve(path: string) {
            var deferred = this.$q.defer();
            p.util.Progress.start();

            require([path], () =>
            {
                this.$rootScope.$apply(() =>
                {
                    deferred.resolve();
                    console.log('Dependency Manager: resolved ' + path);
                    p.util.Progress.done();
                });
            });

            return deferred.promise;
        }

    }
}