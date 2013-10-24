///<reference path="../reference.d.ts"/>
///<amd-dependency path="angular"/>
import a = require('./../util/StdUtil');

export module modularity {
    export class FilterModule {
        private module: ng.IModule;

        constructor() {
            this.module = angular.module('lwa.filter', []);
        }

        configure() {
            this.module
                .filter('lwaRound', this.lwaRound)
            ;
            return this;
        }

        private lwaRound = () => {
            return (input: number, inputDecimals: number) => {
                var out = input;
                var outDecimals = 2; // Padrão duas casas na conversão
                if (inputDecimals) outDecimals = inputDecimals;
                if (isNaN(out) || isNaN(outDecimals)) return 0;

                out = a.util.Std.round(out, outDecimals);
                return out;
            }
        }
    }
}