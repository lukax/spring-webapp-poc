///<reference path="./../reference.d.ts"/>

export module directive {
    export class LabeledInputDirective implements ng.IDirective {

        public restrict = 'E';
        public replace = true;
        public scope = {
          formName: '@',
          labelName: '@',
          inputTooltip: '@',
          inputModel: '='
        };
        public template =
            '<div class="form-group form-horizontal" ng-class="{\'has-error\': {{formName}}.input{{labelName}}.$invalid}">'+
                '<label for="input{{labelName}}" class="col-lg-2 control-label">{{labelName}}</label>'+
                '<div class="col-lg-10">'+
                    '<input type="text" class="form-control" id="input{{labelName}}" name="input{{labelName}}" '+
                    ' ng-model="inputModel" >'+
                '</div>'+
            '</div>'
        ;
        public link = (scope: any, element: any, attrs: ng.IAttributes) => {
            //angular.element(angular.element(element.children()[1]).children()[0]).attr('ng-model', scope.inputModel);
            //attrs.$set('ngModel', scope.inputModel);
        }

        //public controller = StdInputDirectiveController;

    }

//    export class StdInputDirectiveController {
//        static $inject = ['$scope', 'AlertService'];
//        constructor($scope, AlertService: any) {
//            $scope.alerts = AlertService.list();
//        }
//    }
}