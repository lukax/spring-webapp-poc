///<reference path="../../reference.ts"/>

core.module
  .directive("entityId", ():ng.IDirective => {
    return {
      restrict: "E",
      templateUrl: "/template/directive/EntityIdTemplate.html"
    }
  })

  .directive("saveChanges", ():ng.IDirective => {
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
  })

  .directive("formItem", ():ng.IDirective => {
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
  })


