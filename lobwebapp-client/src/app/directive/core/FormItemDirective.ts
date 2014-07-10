///<reference path="../../reference.ts"/>

module directive {
    export class FormItemDirective implements ng.IDirective {
    	restrict = "E";
    	transclude = true;
    	scope = {
    		inputId: "@",
    		inputColumn: "@",
    		inputLabel: "@",
    		form: "="
    	};
    	templateUrl = "/template/directive/FormItemTemplate.html";
    }
}
