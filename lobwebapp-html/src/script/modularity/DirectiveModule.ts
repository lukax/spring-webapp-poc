///<reference path="../reference.d.ts"/>

module modularity {
    export class DirectiveModule {
        constructor(public profile: string) {
            //Global usage directives
            angular.module("lwa.directive", 
                ["lwa.service",
                 "ngAnimate", 
                 "ui.bootstrap", 
                 "ui.utils"
                ]);
        }

    }
}