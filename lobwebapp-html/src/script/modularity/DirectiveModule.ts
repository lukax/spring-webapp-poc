///<reference path="../reference.d.ts"/>

///<amd-dependency path="angularAnimate"/>
///<amd-dependency path="angularUi"/>
///<amd-dependency path="angularUiBootstrap"/>
///<amd-dependency path="angularUiUtils"/>

export module modularity {
    export class DirectiveModule {
        constructor() {
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