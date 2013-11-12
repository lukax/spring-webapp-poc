///<reference path="../reference.d.ts"/>


export module modularity {
    export class FilterModule {
        private module: ng.IModule;

        constructor() {
            this.module = angular.module('lwa.filter', []);
        }

        configure() {
            //Global usage filters configuration
            this.module
                .filter('sum', this.sum);
                //.filter('round', this.round)
            ;
            return this;
        }

        private sum = () => {
            return (input: Array<any>, propertyName: string) => {
                var sum = 0;
                input.forEach((x: any) => {
                    sum += x[propertyName];
                });
                console.log('Filter sum called: '+ sum);
                return sum;
            }
        }

        // private round = () => {
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