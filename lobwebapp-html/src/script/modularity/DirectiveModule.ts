///<reference path="../reference.d.ts"/>

///<amd-dependency path="angularRoute"/>
///<amd-dependency path="angularAnimate"/>
///<amd-dependency path="angularUi"/>
///<amd-dependency path="angularUiBootstrap"/>
///<amd-dependency path="ngAnimateAnimateCss"/>
///<amd-dependency path="angularUiUtils"/>

export module modularity {
    export class DirectiveModule {
        constructor() {
            angular.module("lwa.directive", 
                ["ngRoute",
                 "ngAnimate", 
                 "ui.bootstrap", 
                 "ui.utils"
                 ]);
        }

    }
}