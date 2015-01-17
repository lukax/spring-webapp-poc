///<reference path="../../ts-definitions/angularjs/angular.d.ts"/>
///<reference path="../../ts-definitions/angularui/angular-ui.d.ts"/>
///<reference path="../../ts-definitions/jquery/jquery.d.ts"/>
///<reference path="../../ts-definitions/requirejs/require.d.ts"/>
///<reference path="../../ts-definitions/underscore/underscore.d.ts"/>
///<reference path="../../ts-definitions/d3/d3.d.ts"/>
///<reference path="../../ts-definitions/crossfilter/crossfilter.d.ts"/>
///<reference path="../../ts-definitions/urijs/URI.d.ts"/>

///<reference path="lwa.core/domain/AbstractEntity.ts"/>
///<reference path="lwa.core/domain/Person.ts"/>
///<reference path="lwa.core/domain/Alert.ts"/>
///<reference path="lwa.core/domain/Page.ts"/>
///<reference path="lwa.core/domain/MessageResponse.ts"/>
///<reference path="lwa.core/domain/ValidationResult.ts"/>
///<reference path="lwa.core/domain/AuthToken.ts"/>
///<reference path="lwa.core/service/EntityService.ts"/>
///<reference path="lwa.core/service/AlertService.ts"/>
///<reference path="lwa.core/service/NavigatorService.ts"/>
///<reference path="lwa.core/controller/IAppScope.ts"/>
///<reference path="lwa.core/controller/IController.ts"/>
///<reference path="lwa.core/util/EnumUtil.ts"/>

///<reference path="lwa.order/domain/Order.ts"/>
///<reference path="lwa.order/domain/Payment.ts"/>
///<reference path="lwa.order/service/OrderService.ts"/>

///<reference path="lwa.customer/domain/Customer.ts"/>
///<reference path="lwa.customer/service/CustomerService.ts"/>

///<reference path="lwa.user/service/AuthService.ts"/>
///<reference path="lwa.user/service/UserService.ts"/>
///<reference path="lwa.user/domain/User.ts"/>

///<reference path="lwa.product/domain/Product.ts"/>
///<reference path="lwa.product/service/ProductService.ts"/>

///<reference path="lwa.stock/service/StockService.ts"/>
///<reference path="lwa.stock/domain/Stock.ts"/>

declare var dc: any;
declare module "NProgress" { export = any; }
