///<reference path="../reference.d.ts"/>
///<amd-dependency path="angularAnimate"/>
///<amd-dependency path="angularUi"/>
///<amd-dependency path="angularUiBootstrap"/>
///<amd-dependency path="angularUiUtils"/>
import customerDetail = require("../directive/CustomerDetailDirective");
import formUtils = require("../directive/FormUtilsDirective");
import imageUpload = require("../directive/ImageUploadDirective");
import listUtils = require("../directive/ListUtilsDirective");
import paymentDetail = require("../directive/PaymentDetailDirective");
import productDetail = require("../directive/ProductDetailDirective");
import quickSearch = require("../directive/QuickSearchDirective");

class DirectiveModule {
    constructor(public profile: string) {
        //Global usage directives
        angular.module("lwa.directive",
            ["lwa.service",
                "ngAnimate",
                "ui.bootstrap",
                "ui.utils"
            ])
            .directive("customerDetail", customerDetail.CustomerDetailDirective)
            .directive("entityId", formUtils.EntityIdDirective)
            .directive("formItem", formUtils.FormItemDirective)
            .directive("saveChanges", formUtils.SaveChangesDirective)
            .directive("imageUpload", imageUpload.ImageUploadDirective)
            .directive("listPager", listUtils.ListPagerDirective)
            .directive("searchBar", listUtils.SearchBarDirective)
            .directive("paymentDetail", paymentDetail.PaymentDetailDirective)
            .filter("paymentMode", paymentDetail.PaymentModeFilter)
            .filter("paymentStatus", paymentDetail.PaymentStatusFilter)
            .directive("productDetail", productDetail.ProductDetailDirective)
            .directive("quickSearch", quickSearch.QuickSearchDirective)

        ;
    }

}
export = DirectiveModule;