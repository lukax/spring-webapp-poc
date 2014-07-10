///<reference path="../../reference.ts"/>

module directive {
    export interface ImageUploadViewModel extends ng.IScope {
        url: string;
        placeholder: string;
        imageSrc: string;
        percentage: number;
        loading: boolean;
        uploadDone: () => void;
        uploadFailed: () => void;
        uploadStatus: (percentage: number) => void;
    }

    export class ImageUploadDirective implements ng.IDirective {

        restrict = 'E';

        scope: ImageUploadViewModel = <ImageUploadViewModel>{
            url: "=",
            placeholder: "="
        };

        templateUrl = '/template/directive/ImageUploadTemplate.html';

        link = ($scope: ImageUploadViewModel, element: any, attrs: any)=>{
            element.find("#imageUploadIncludeImage").on("click", ()=>{
                if(!$scope.loading)
                    element.find("#imageUploadInput").click();    
            });
            
            element.find("#imageUploadInput").fileupload({
                dataType: "json", //server return type
                acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                maxFileSize: 5100000,
                done: (e, data) => {
                    $scope.uploadDone();
                },
                fail: (e, data) =>{
                    $scope.uploadFailed();
                },
                progressall: (e, data) => {
                    $scope.uploadStatus(data.loaded / data.total);
                }
            });

            $scope.$watch("url", (newValue: string)=>{
                if(newValue == null || newValue == "") 
                    $scope.imageSrc = $scope.placeholder;
                else {
                    //update url
                    element.find("#imageUploadInput").fileupload("option","url",newValue);
                    $.ajax(newValue)
                        .done((data)=>{
                            $scope.imageSrc = newValue;
                        })
                        .fail(()=>{
                            $scope.imageSrc = $scope.placeholder;
                        });
                }
            }); 
        };

        controller = ["AlertService", "Progress", "$scope",
                (AlertService, Progress, $scope: ImageUploadViewModel) => {
            
            $scope.uploadFailed = () => {
                AlertService.add({ title: "Upload falhou", content: "A imagem precisa estar em um formato válido e ser menor que 5 MB", type: util.AlertType.DANGER });
                $scope.loading = false;
            }
            $scope.uploadDone = () => {
                $scope.url = new URI($scope.url).addSearch("cache", new Date().getTime().toString()).toString();
                $scope.loading = false;
            }
            $scope.uploadStatus = (percentage: number) => {
                $scope.percentage = percentage * 100;
                $scope.loading = true;
                Progress.set(percentage);
            }
        }];

    }
}
