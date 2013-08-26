"use strict";angular.module("lobwebappHtmlApp",[]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/product",{templateUrl:"views/product.html",controller:"ProductCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("lobwebappHtmlApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("lobwebappHtmlApp").controller("ProductCtrl",["$scope","$http",function(a,b){function c(a,b,c,d){this.id=a,this.name=b,this.price=c,this.description=d}var d="http://localhost:8080/lobwebapp-core/rest/product/";a.mode={actual:"Add",save:"Add",edit:"Update"},a.espBtnStat=function(){return a.mode.actual==a.mode.edit?"button":"hidden"},a.saveProduct=function(){var c;a.mode.actual==a.mode.save&&(c=b.post(d,a.product)),a.mode.actual==a.mode.edit&&(c=b.put(d,a.product)),c.success(function(b,c){a.displayInfoBar("Produto salvado com sucesso",c)}).error(function(b){a.displayInfoBar("Produto não pode ser salvado",b.message+" "+b.description)}).then(function(){a.listProduct()}),a.newProduct()},a.listProduct=function(){b.get(d).success(function(b){a.data=b}).error(function(){a.displayInfoBar("Requisição falhou: ",status)})},a.editProduct=function(b){a.product=new c(b.id,b.name,b.price,b.description),a.mode.actual=a.mode.edit},a.deleteProduct=function(c){b.delete(d+c.id).success(function(b,c){a.displayInfoBar("Produto excluido com sucesso",c)}).error(function(b,c){a.displayInfoBar("Produto não pode ser excluido",c)}).then(function(){a.listProduct()}),a.newProduct()},a.newProduct=function(){a.product=new c(0,"","",""),a.mode.actual=a.mode.save},a.displayInfoBar=function(b,c){a.info={message:b,description:c},document.getElementById("infoBar").style.display="block"},a.dismissInfoBar=function(){document.getElementById("infoBar").style.display="none"},a.newProduct(),a.dismissInfoBar()}]);