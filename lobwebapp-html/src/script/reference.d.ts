///<reference path="./../../ts-definitions/angularjs/angular.d.ts"/>
///<reference path="./../../ts-definitions/angularui/angular-ui.d.ts"/>
///<reference path="./../../ts-definitions/jquery/jquery.d.ts"/>
///<reference path="./../../ts-definitions/requirejs/require.d.ts"/>
///<reference path="./../../ts-definitions/underscore/underscore.d.ts"/>
///<reference path="./../../ts-definitions/d3/d3.d.ts"/>

///<reference path="./controller/base/Controller.ts"/>
///<reference path="./controller/base/ViewModel.ts"/>
///<reference path="./controller/product/EditProductController.ts"/>
///<reference path="./controller/product/ListProductController.ts"/>
///<reference path="./controller/user/AuthUserController.ts"/>
///<reference path="./controller/MainNavbarController.ts"/>

///<reference path="./domain/base/AbstractEntity.ts"/>
///<reference path="./domain/base/Person.ts"/>
///<reference path="./domain/util/Alert.ts"/>
///<reference path="./domain/util/Pageable.ts"/>
///<reference path="./domain/util/Error.ts"/>
///<reference path="./domain/AuthToken.ts"/>
///<reference path="./domain/Product.ts"/>
///<reference path="./domain/User.ts"/>
///<reference path="./domain/Order.ts"/>
///<reference path="./domain/Payment.ts"/>
///<reference path="./domain/Customer.ts"/>
///<reference path="./domain/Stock.ts"/>

///<reference path="./modularity/AppModule.ts"/>
///<reference path="./modularity/AppRoutes.ts"/>
///<reference path="./modularity/ControllerModule.ts"/>
///<reference path="./modularity/DirectiveModule.ts"/>
///<reference path="./modularity/ServiceModule.ts"/>

///<reference path="./service/contract/base/EntityService.ts"/>
///<reference path="./service/contract/base/PersonService.ts"/>
///<reference path="./service/contract/AlertService.ts"/>
///<reference path="./service/contract/NavigationService.ts"/>
///<reference path="./service/contract/AuthService.ts"/>
///<reference path="./service/contract/OrderService.ts"/>
///<reference path="./service/contract/CustomerService.ts"/>
///<reference path="./service/contract/ProductService.ts"/>
///<reference path="./service/contract/UserService.ts"/>

///<reference path="./service/impl/base/EntityServiceImpl.ts"/>
///<reference path="./service/impl/base/PersonServiceImpl.ts"/>
///<reference path="./service/impl/NavigationServiceImpl.ts"/>
///<reference path="./service/impl/ProductServiceImpl.ts"/>
///<reference path="./service/impl/OrderServiceImpl.ts"/>
///<reference path="./service/impl/CustomerServiceImpl.ts"/>
///<reference path="./service/impl/UserServiceImpl.ts"/>
///<reference path="./service/impl/AuthServiceImpl.ts"/>

///<reference path="./service/mock/base/EntityServiceMock.ts"/>
///<reference path="./service/mock/base/PersonServiceMock.ts"/>
///<reference path="./service/mock/AlertServiceMock.ts"/>
///<reference path="./service/mock/AuthServiceMock.ts"/>
///<reference path="./service/mock/CustomerServiceMock.ts"/>
///<reference path="./service/mock/OrderServiceMock.ts"/>
///<reference path="./service/mock/ProductServiceMock.ts"/>
///<reference path="./service/mock/UserServiceMock.ts"/>

///<reference path="./util/DependencyManager.ts"/>
///<reference path="./util/Progress.ts"/>
///<reference path="./util/EnumUtil.ts"/>

declare var dc: any;
declare var crossfilter: any;
declare module "NProgress" { export = any; }