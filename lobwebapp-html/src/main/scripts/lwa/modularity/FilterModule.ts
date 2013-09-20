///<reference path='../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='../../../../../ts-definitions/requirejs/require.d.ts'/>
///<reference path='../util/Std.ts'/>

import angular = require('angular');
import util = require('./../util/Std');

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
                    
                out = util.Std.round(out, outDecimals);
                return out;
            };
        });
        return this;
    }
}