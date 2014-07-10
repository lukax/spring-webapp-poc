///<reference path="../reference.ts"/>

var DirectiveModule = angular.module("lwa.directive",
    ["lwa.service",
        "ngAnimate",
        "ui.bootstrap",
        "ui.utils"
    ]);

DirectiveModule
    .directive("customerDetail", [() => new directive.CustomerDetailDirective()])
    .directive("entityId", [() => new directive.EntityIdDirective()])
    .directive("saveChanges", [() => new directive.SaveChangesDirective()])
    .directive("formItem", [() => new directive.FormItemDirective()])
    .directive("imageUpload", [() => new directive.ImageUploadDirective()])
    .directive("searchBar", [() => new directive.SearchBarDirective()])
    .directive("listPager", [() => new directive.ListPagerDirective()])
    .filter("paymentStatus", [() => filter.PaymentStatusFilter])
    .filter("paymentMode", [() => filter.PaymentModeFilter])
    .directive("paymentDetail", [() => new directive.PaymentDetailDirective()])
    .directive("productDetail", [() => new directive.ProductDetailDirective()])
    .directive("quickSearch", [() => new directive.QuickSearchDirective()])
    ;
