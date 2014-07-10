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
    	template = tpl.FormItemDirective.html;
    }
}
