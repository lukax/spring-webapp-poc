///<reference path="../../reference.ts"/>

module service.impl {
    export class UserServiceImpl extends base.PersonServiceImpl<domain.User> 
        implements service.contract.UserService, service.contract.base.HasDefaultValue<domain.User> {
        
        static $inject = ["$http"];
        constructor($http: ng.IHttpService) {
            super("user", $http, this);
        }

        findByUsername(username: string,
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                var params = {
                    username: "%" + username + "%"
                };
                
                this.$http({method: "GET", 
                            url: this.url, 
                            params: params })
                    .success(successCallback)
                    .error(errorCallback);
        }
        
        getDefault(): domain.User{
            return { id: 0, username: "", password: "", roles: [], name: "" };
        }
    }
}
