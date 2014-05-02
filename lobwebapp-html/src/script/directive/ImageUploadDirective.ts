///<reference path="../reference.d.ts"/>

import URI = require("urijs");
import enums = require("./../util/EnumUtil");

export module directive {
    export interface ImageUploadViewModel extends ng.IScope {
        Progress: d.service.contract.Progress;
        imageUrl: string;
        localImageUrl: string;
        percentage: number;
        loading: boolean;
        uploadFailed: () => void;
    }

    export class ImageUploadDirective implements ng.IDirective {
        restrict = 'E';
        scope: ImageUploadViewModel = <ImageUploadViewModel>{
            imageUrl: "="
        };
        templateUrl = '/template/directive/ImageUploadTemplate.html';
        link = (scope: ImageUploadViewModel, element: any, attrs: any)=>{
            element.find("#imageUploadIncludeImage").on("click", ()=>{
                element.find("#imageUploadInput").click();    
            });
            
            element.find("#imageUploadInput").fileupload({
                dataType: 'json',
                acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                maxFileSize: 5000000,
                minFileSize: 1000,
                done: (e, data) => {
                    console.log(data);
                    scope.imageUrl = new URI(scope.imageUrl).addSearch("cache", new Date().getTime().toString()).toString();                
                },
                fail: (e, data) =>{
                    scope.uploadFailed();
                },
                progressall: (e, data) => {
                    var load = data.loaded / data.total;
                    scope.Progress.set(load);
                    scope.percentage = load * 100;
                }
            });

            scope.$watch("imageUrl", (newValue: string)=>{
                if(newValue == null || newValue == "") return;

                element.find("#imageUploadInput").fileupload("option","url",newValue);

                $.ajax(newValue)
                    .done((data)=>{
                        scope.localImageUrl = newValue;
                    })
                    .fail(()=>{
                        scope.localImageUrl = "/img/imageplaceholder.png";
                    });
            }); 
            
        };
        controller = ["AlertService", "Progress", "$scope", (AlertService, Progress, $scope: ImageUploadViewModel) => {
            $scope.Progress = Progress;

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