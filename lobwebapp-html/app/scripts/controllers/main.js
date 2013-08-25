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
        var url = 'http://localhost:8080/lobwebapp-core/rest/product/'; 
        $scope.mode = { "actual": "Add",
          "save" : "Add",
          "edit" : "Update"
        };
        $scope.espBtnStat = function(){
          if($scope.mode.actual == $scope.mode.edit) return "button";
          else return "hidden";
        };
    
        $scope.saveProduct = function () {
          var promise;
          if($scope.mode.actual == $scope.mode.save){
            promise = $http.post(url, $scope.product);
          }
          if($scope.mode.actual == $scope.mode.edit){
            promise = $http.put(url, $scope.product);
          }
          promise
            .success(function(data, status){
              $scope.displayInfoBar('Produto salvado com sucesso', status);
            })
            .error(function(data, status){
              $scope.displayInfoBar('Produto não pode ser salvado', data.message + ' ' + data.description);
            }) 
            .then(function(){$scope.listProduct();});
          
          $scope.newProduct();
        };

        $scope.listProduct = function(){
          $http.get(url).
              success(function(data) {
                $scope.data = data;
              }).
              error(function(data) {
                $scope.displayInfoBar('Requisição falhou: ', status);
              });
        };
        
        $scope.editProduct = function(prod){
            $scope.product = new Product(prod.id, prod.name, prod.price, prod.description);
            $scope.mode.actual = $scope.mode.edit;
        };

        $scope.deleteProduct = function(prod){
            $http.delete(url+ prod.id)
              .success(function(data,status){
                $scope.displayInfoBar('Produto excluido com sucesso', status);
              })
              .error(function(data,status){
                $scope.displayInfoBar('Produto não pode ser excluido', status);
              })
              .then(function(){$scope.listProduct();})
            $scope.newProduct();
        };

        $scope.newProduct = function(){
          $scope.product = new Product(0,"","","");
          $scope.mode.actual = $scope.mode.save;
        };

        function Product(id, name, price, description){
          this.id = id;
          this.name = name;
          this.price = price;
          this.description = description;
        };

        $scope.displayInfoBar = function(message, description){
          $scope.info = {
            "message" : message,
            "description" : description
          }
          document.getElementById('infoBar').style.display = 'block';
        }

        $scope.dismissInfoBar = function(){
          document.getElementById('infoBar').style.display = 'none';
        }

        //Start
        $scope.newProduct();
        $scope.dismissInfoBar();
        //
});