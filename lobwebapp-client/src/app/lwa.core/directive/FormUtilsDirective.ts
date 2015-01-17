///<reference path="../../reference.d.ts"/>

export function EntityIdDirective(): ng.IDirective {
    return {
        restrict: "E",
        templateUrl: "/template/directive/EntityIdTemplate.html"
    }

}

export function SaveChangesDirective(): ng.IDirective {
    return {
        restrict: "E",
        scope: {
            disabled: "=",
            saveDisabled: "=",
            removeDisabled: "=",
            discardDisabled: "=",
            onRemove: "&",
            onDiscard: "&"
        },
        templateUrl: "/template/directive/SaveChangesTemplate.html"
    }
}

export function FormItemDirective(): ng.IDirective {
    return {
        restrict: "E",
        transclude: true,
        scope: {
            inputId: "@",
            inputColumn: "@",
            inputLabel: "@",
            form: "="
        },
        templateUrl: "/template/directive/FormItemTemplate.html"
    }
}
