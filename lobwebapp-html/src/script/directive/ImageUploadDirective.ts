///<reference path="./../reference.d.ts"/>

import enums = require("./../util/EnumUtil");
import NProgress = require("NProgress");

export module directive {
    export class ImageUploadDirective implements ng.IDirective {

        restrict = 'E';

        replace = true;

        scope = {
            imageUrl: "="
        };

        templateUrl = '/template/directive/ImageUploadTemplate.html';

        link = (scope: any, element: any, attrs: any)=>{
            element.find("#imageUploadIncludeImage").on("click", ()=>{
                element.find("#imageUploadInput").click();    
            });
            
            element.find("#imageUploadInput").fileupload({
                dataType: 'json',
                acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                maxFileSize: 5000000,
                minFileSize: 1,
                done: (e, data) => {
                    console.log(data);

                    if(scope.imageUrl.indexOf("?") == -1)
                        scope.imageUrl += "?"+ new Date().getTime();
                    scope.imageUrl += "&" + new Date().getTime();
                
                },
                fail: (e, data) =>{
                    scope.uploadFailed();
                },
                progressall: (e, data) => {
                    var load = data.loaded / data.total;
                    NProgress.set(load);
                    scope.percentage = load * 100;
                }
            });

            scope.$watch("imageUrl", (newValue, oldValue)=>{
                if(newValue == null || newValue == "") return;

                element.find("#imageUploadInput").fileupload("option","url",newValue);

                $.ajax(newValue)
                    .done((data)=>{
                        scope.imageSrc = newValue;
                    })
                    .fail(()=>{
                        scope.imageSrc = "/img/imageplaceholder.png";
                    });
            }); 
            
        };

        controller = ["AlertService", "$scope", (AlertService, $scope) => {
            $scope.uploadFailed = () => {
                AlertService.add({ title: "Upload falhou", content: "A imagem precisa estar em um formato válido e ser menor que 5 MB", type: enums.AlertType.DANGER });
            }

            $scope.$watch("percentage", (newValue, oldValue)=>{
                if(newValue == null || newValue == 100)
                    $scope.loading = false;
                else
                    $scope.loading = true;
            });

        }];

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.directive("imageUpload", [() => new directive.ImageUploadDirective()]);
};