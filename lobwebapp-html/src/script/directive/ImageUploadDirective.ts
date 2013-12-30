///<reference path="./../reference.d.ts"/>

import NProgress = require("NProgress");

export module directive {
    export class ImageUploadDirective implements ng.IDirective {

        public restrict = 'E';
        public replace = true;
        public scope = {
            imageUrl: "=",
            done: "&"
        };
        public templateUrl = '/template/directive/ImageUploadTemplate.html';
        public link = (scope: any, element: any, attrs: any)=>{
            element.find("#imageUploadIncludeImage").on("click", ()=>{
                element.find("#imageUploadInput").click();    
            });
            
            (<any>element.find("#imageUploadInput")).fileupload({
                dataType: 'json',
                acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                maxFileSize: 5000000,
                always: (e, data) => {
                    if(data.result)
                        $.each(data.result.files, function (index, file) {
                            $('<p/>').text(file.name).appendTo(document.body);
                        });
                    console.log(data);
                    if(scope.done != null)
                        scope.done();
                },
                progressall: (e, data) => {
                    var load = data.loaded / data.total;
                    (<any>NProgress).set(load);
                    scope.percentage = load * 100;
                }
            });

            scope.$watch("imageUrl", (newValue, oldValue)=>{
               (<any>element.find("#imageUploadInput")).fileupload("option","url",newValue);
            }); 

            scope.$watch("percentage", (newValue, oldValue)=>{
                if(newValue == null || newValue == 100)
                    scope.loading = false;
                else
                    scope.loading = true;
            });
            
        }    
    }
}