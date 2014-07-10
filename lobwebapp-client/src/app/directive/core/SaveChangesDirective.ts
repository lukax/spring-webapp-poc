///<reference path="../../reference.ts"/>

module directive {
    export class SaveChangesDirective implements ng.IDirective {
        restrict = "E";
        scope = {
            disabled: "=",
            saveDisabled: "=",
            removeDisabled: "=",
            discardDisabled: "=",
            onRemove: "&",
            onDiscard: "&"
        };
        templateUrl = "/template/directive/SaveChangesTemplate.html";
    }
}
