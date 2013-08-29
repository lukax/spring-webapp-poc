var domain;
(function (domain) {
    (function (base) {
        var AbstractEntity = (function () {
            function AbstractEntity(id) {
                this.id = id;
            }
            return AbstractEntity;
        })();
        base.AbstractEntity = AbstractEntity;
    })(domain.base || (domain.base = {}));
    var base = domain.base;
})(domain || (domain = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var domain;
(function (domain) {
    var Product = (function (_super) {
        __extends(Product, _super);
        function Product(id, name, price, description) {
            _super.call(this, id);
            this.id = id;
            this.name = name;
            this.price = price;
            this.description = description;
        }
        return Product;
    })(domain.base.AbstractEntity);
    domain.Product = Product;
})(domain || (domain = {}));
var controller;
(function (controller) {
    var ListProductController = (function () {
        function ListProductController($scope, $productService) {
            $scope.product = new domain.Product(0, '', 0, '');
            $productService.list(function (data, status, headers, config) {
                $scope.products = data;
                $scope.status = status;
            }, function (data, status, headers, config) {
                $scope.message = 'Error!';
            });
            $scope.message = 'Ok';
        }
        return ListProductController;
    })();
    controller.ListProductController = ListProductController;
})(controller || (controller = {}));
var service;
(function (service) {
    (function (mock) {
        (function (base) {
            var AbstractEntityServiceMock = (function () {
                function AbstractEntityServiceMock() {
                    this.repository = new Array();
                }
                AbstractEntityServiceMock.prototype.save = function (entity, successCallback, errorCallback) {
                    this.getRepository().push(entity);
                };

                AbstractEntityServiceMock.prototype.update = function (entity, successCallback, errorCallback) {
                    this.getRepository().forEach(function (item, index) {
                        if (item.id == entity.id) {
                            this.getRepository()[index] = entity;
                            return;
                        }
                    });
                };

                AbstractEntityServiceMock.prototype.remove = function (entity, successCallback, errorCallback) {
                    this.getRepository().forEach(function (item, index) {
                        if (item.id == entity.id) {
                            this.getRepository().splice(index, 1);
                        }
                    });
                };

                AbstractEntityServiceMock.prototype.findById = function (id, successCallback, errorCallback) {
                    this.getRepository().forEach(function (item) {
                        if (item.id == id) {
                            successCallback(item, 200, null, null);
                            return;
                        }
                    });
                };

                AbstractEntityServiceMock.prototype.list = function (successCallback, errorCallback) {
                    successCallback(this.getRepository(), 200, null, null);
                };

                AbstractEntityServiceMock.prototype.getRepository = function () {
                    return this.repository;
                };
                return AbstractEntityServiceMock;
            })();
            base.AbstractEntityServiceMock = AbstractEntityServiceMock;
        })(mock.base || (mock.base = {}));
        var base = mock.base;
    })(service.mock || (service.mock = {}));
    var mock = service.mock;
})(service || (service = {}));
var service;
(function (service) {
    (function (mock) {
        var DefaultProductServiceMock = (function (_super) {
            __extends(DefaultProductServiceMock, _super);
            function DefaultProductServiceMock() {
                _super.call(this);
                _super.prototype.getRepository.call(this).push(new domain.Product(1, 'Vassoura', 15, 'Comum'));
                _super.prototype.getRepository.call(this).push(new domain.Product(2, 'Cabide', 5, 'Plastico'));
                _super.prototype.getRepository.call(this).push(new domain.Product(3, 'Desodorante', 8, 'Axe super fresh'));
            }
            DefaultProductServiceMock.prototype.findByName = function (name, successCallback, errorCallback) {
                return _super.prototype.getRepository.call(this).filter(function (element) {
                    return element.name == name;
                });
            };
            return DefaultProductServiceMock;
        })(service.mock.base.AbstractEntityServiceMock);
        mock.DefaultProductServiceMock = DefaultProductServiceMock;
    })(service.mock || (service.mock = {}));
    var mock = service.mock;
})(service || (service = {}));
angular.module('lobwebapp-html', []).service('$productService', function () {
    return new service.mock.DefaultProductServiceMock();
}).config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', { redirectTo: '/product' }).when('/product', {
            templateUrl: 'views/product/listProduct.html',
            controller: controller.ListProductController,
            caseInsensitiveMatch: true
        }).otherwise({ redirectTo: '/' });
    }
]).config([
    '$locationProvider',
    function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
var controller;
(function (controller) {
    var EditProductController = (function () {
        function EditProductController($scope, $productService) {
        }
        return EditProductController;
    })();
    controller.EditProductController = EditProductController;
})(controller || (controller = {}));
var domain;
(function (domain) {
    (function (base) {
        var ResponseMessage = (function () {
            function ResponseMessage(message, description) {
                this.message = message;
                this.description = description;
            }
            return ResponseMessage;
        })();
        base.ResponseMessage = ResponseMessage;
    })(domain.base || (domain.base = {}));
    var base = domain.base;
})(domain || (domain = {}));
var service;
(function (service) {
    (function (impl) {
        (function (base) {
            var AbstractEntityService = (function () {
                function AbstractEntityService(contextUrl, $http) {
                    this.rootUrl = "http://localhost:8080/lobwebapp-core/rest";
                    this.rootUrl += '/' + contextUrl;
                    this.http = $http;
                }
                AbstractEntityService.prototype.save = function (entity, successCallback, errorCallback) {
                    this.getHttp().post(this.rootUrl, entity).success(successCallback).error(errorCallback);
                };

                AbstractEntityService.prototype.update = function (entity, successCallback, errorCallback) {
                    this.getHttp().put(this.rootUrl, entity).success(successCallback).error(errorCallback);
                };

                AbstractEntityService.prototype.remove = function (entity, successCallback, errorCallback) {
                    this.getHttp().delete(this.rootUrl, entity).success(successCallback).error(errorCallback);
                };

                AbstractEntityService.prototype.findById = function (id, successCallback, errorCallback) {
                    this.getHttp().get(this.rootUrl + '/' + id).success(successCallback).error(errorCallback);
                };

                AbstractEntityService.prototype.list = function (successCallback, errorCallback) {
                    this.getHttp().get(this.rootUrl).success(successCallback).error(errorCallback);
                };

                AbstractEntityService.prototype.getHttp = function () {
                    return this.http;
                };
                return AbstractEntityService;
            })();
            base.AbstractEntityService = AbstractEntityService;
        })(impl.base || (impl.base = {}));
        var base = impl.base;
    })(service.impl || (service.impl = {}));
    var impl = service.impl;
})(service || (service = {}));
var service;
(function (service) {
    (function (impl) {
        var DefaultProductService = (function (_super) {
            __extends(DefaultProductService, _super);
            function DefaultProductService($http) {
                _super.call(this, 'product', $http);
            }
            DefaultProductService.prototype.findByName = function (name, successCallback, errorCallback) {
            };
            return DefaultProductService;
        })(service.impl.base.AbstractEntityService);
        impl.DefaultProductService = DefaultProductService;
    })(service.impl || (service.impl = {}));
    var impl = service.impl;
})(service || (service = {}));
