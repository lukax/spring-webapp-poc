///<reference path="../reference.d.ts"/>
///<amd-dependency path="angular"/>

export module modularity {
    export class FilterModule {
        private module: ng.IModule;

        constructor() {
            this.module = angular.module('lwa.filter', []);
        }

        configure() {
            //Global usage filters configuration
            this.module
                //.filter('lwaRound', this.lwaRound)
            ;
            return this;
        }

        // private lwaRound = () => {
        //     return (input: number, inputDecimals: number) => {
        //         var out = input;
        //         var outDecimals = 2; // Padrão duas casas na conversão
        //         if (inputDecimals) outDecimals = inputDecimals;
        //         if (isNaN(out) || isNaN(outDecimals)) return 0;

        //         out = a.util.Std.round(out, outDecimals);
        //         return out;
        //     }
        // }
    }
}