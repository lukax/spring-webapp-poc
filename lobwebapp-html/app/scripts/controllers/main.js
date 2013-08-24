'use strict';

angular.module('lobwebappHtmlApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });


angular.module('lobwebappHtmlApp')
  .controller('ProductCtrl', function($scope, $http) {
        $scope.title = "Add Product";
        var method = 'GET'; 
        var url = 'http://localhost:8080/lobwebapp-core/rest/product'; 
        
        function Product(id, name, price, description){
            this.id = id;
            this.name = name;
            this.price = price;
            this.description = description;
        }

         $scope.saveProduct = function () {
            var product = new Product(0, $scope.name, $scope.price, null);
            $http.post(url, product).then(function(){$scope.listProduct();});
         };

       
        $scope.listProduct = function(){
            $http({method: method, url: url}).
                success(function(data) {
                    $scope.data = data;
                }).
                error(function(data) {
                  $scope.data = data || "Request failed";
                });
          };
        
        $scope.editProduct = function(item){
            $scope.id = item.id;
            $scope.name = item.name;
            $scope.price = item.price;
            $scope.description = item.description;
        }

        $scope.deleteProduct = function(index){
            $http.delete(url+'/'+ index).then(function(){$scope.listProduct();})
            if($scope.id == index){
              $scope.id = 0;
            }
        }
});