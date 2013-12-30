///<reference path="../reference.d.ts"/>

export module modularity {
    export class FilterModule {
        constructor() {
            angular.module("lwa.filter", [])

                .filter("sum", this.sum)

                ;
        }

        private sum = () => {
            return (input: Array<any>, propertyName: string) => {
                var sum = 0;
                input.forEach((x: any) => {
                    sum += x[propertyName];
                });
                console.log("Filter sum called: "+ sum);
                return sum;
            }
        }
    }
}