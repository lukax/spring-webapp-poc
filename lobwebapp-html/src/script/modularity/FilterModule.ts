///<reference path="../reference.d.ts"/>


export module modularity {
    export class FilterModule {
        private module: ng.IModule;

        constructor() {
            this.module = angular.module('lwa.filter', []);
        }

        configure() {
            this.module
                .filter('sum', this.sum);
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
    }
}