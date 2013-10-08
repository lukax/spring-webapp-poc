///<reference path="./../../../reference.d.ts"/>

export module service.mock.base {
    export class AbstractEntityService<T extends domain.base.AbstractEntity> implements d.service.contract.base.EntityService<T> {
        private repository: T[];
        private timeoutService: ng.ITimeoutService;

        constructor($timeout: ng.ITimeoutService) {
            this.repository = new Array<T>();
            this.timeoutService = $timeout;
        }

        public save(entity: T,
            successCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            if (entity.id != 0) errorCallback('ID Inválido', 403, null, null);
            var storId = 0;
            this.getRepository().forEach(
                (item) => {
                    if (item.id > storId) storId = item.id;
                });
            entity.id = ++storId;
            this.getRepository().push(angular.copy(entity));

            successCallback(storId, 200, null, null);
        }

        public update(entity: T,
            successCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            if (entity.id == 0) errorCallback('ID Inválido', 403, null, null);
            var success = false;
            this.getRepository().some(
                (item, index) => {
                    if (item.id == entity.id) {
                        this.getRepository()[index] = angular.copy(entity);
                        success = true;
                        successCallback(null, 200, null, null);
                        return true;
                    }
                    else return false;
                });
            if (!success) errorCallback('ID inexistente', 404, null, null);
        }

        public remove(entity: T,
            successCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            var success = false;
            this.getRepository().some(
                (item, index) => {
                    if (item.id == entity.id) {
                        this.getRepository().splice(index, 1);
                        success = true;
                        successCallback(null, 200, null, null);
                        return true;
                    }
                    else return false;
                });
            if (!success) errorCallback('ID inexistente', 404, null, null);
        }

        public findById(id: number,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            var success = false;
            var retrievedEntity;
            this.getRepository().some(
                (item) => {
                    if (item.id == id) {
                        success = true;
                        retrievedEntity = angular.copy(item);
                        return true; // Break the rest of the iteration
                    }
                    else return false;
                });
            if (success) successCallback(retrievedEntity, 200, null, null);
            else errorCallback(null, 404, null, null);
        }

        public list(
            successCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            this.timeoutService(() => { successCallback(angular.copy(this.getRepository()), 200, null, null); }, 1000);
        }

        public contains(entity: T,
            successCallback: (boolean: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            if (_.contains(this.getRepository(), entity)) successCallback(true, 200, null, null);
            else errorCallback(false, 200, null, null);

        }


        public getRepository() {
            return this.repository;
        }
    }
}