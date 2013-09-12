///<reference path='../../DefinitelyTyped/angularjs/angular.d.ts'/>

module lwa.module{
    export class FilterModule{
        private filterNgModule: ng.IModule;
        
        constructor(){
            this.filterNgModule = angular.module('lwaFilterModule',[]);
        }
        
        configure(){
            this.filterNgModule.filter('lwaRound', () => {
               return (input: number, inputDecimals: number) => {
                    var out = input;
                    var outDecimals = 2; // Padrão duas casas na conversão
                    if(inputDecimals) outDecimals = inputDecimals;
                    if(isNaN(out) || isNaN(outDecimals)) return 0;
                    
                    out = lwa.util.MathUtil.round(out, outDecimals);
                    return out;
               };
            });
            return this;
        }
    }
}