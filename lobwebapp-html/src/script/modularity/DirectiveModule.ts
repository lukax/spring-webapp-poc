///<reference path="../reference.d.ts"/>

///<amd-dependency path="angularRoute"/>
///<amd-dependency path="angularAnimate"/>
///<amd-dependency path="angularUi"/>
///<amd-dependency path="angularUiBootstrap"/>
///<amd-dependency path="ngAnimateAnimateCss"/>
///<amd-dependency path="angularUiUtils"/>

import i1 = require("./../directive/ProductDetailDirective");
import i2 = require("./../directive/CustomerDetailDirective");
import i3 = require("./../directive/PaymentDetailDirective");
import i4 = require("./../directive/SaveChangesDirective");
import i5 = require("./../directive/QuickSearchDirective");
import i6 = require("./../directive/ImageUploadDirective");

export module modularity {
    export class DirectiveModule {
        constructor() {
            angular.module("lwa.directive", ["lwa.service","ngRoute","ngAnimate", "ui.bootstrap", "ui.utils"])

                .directive("productDetail", [() => new i1.directive.ProductDetailDirective()])
                .directive("customerDetail", [() => new i2.directive.CustomerDetailDirective()])
                .directive("paymentDetail", [() => new i3.directive.PaymentDetailDirective()])
                .directive("saveChanges", [() => new i4.directive.SaveChangesDirective()])
                .directive("quickSearch", [() => new i5.directive.QuickSearchDirective()])
                .directive("imageUpload", [() => new i6.directive.ImageUploadDirective()])
                
                ;
        }

    }
}