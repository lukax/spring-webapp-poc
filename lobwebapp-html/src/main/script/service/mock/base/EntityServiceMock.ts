///<reference path="./../../../reference.d.ts"/>

import linqjs = require("linqjs");

export module service.mock.base {
    export class AbstractEntityService<T extends domain.base.AbstractEntity> implements d.service.contract.base.EntityService<T> {
        private repository: T[];
        private timeoutService: ng.ITimeoutService;

        constructor($timeout: ng.ITimeoutService) {
            this.repository = new Array<T>();
            this.timeoutService = $timeout;
        }

        public save(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                if (entity.id != 0) errorCallback({message: "ID Inválido"}, 403, null, null);
                var storId = 0;
                this.getRepository().forEach(
                    (item: T) => {
                        if (item.id > storId) storId = item.id;
                    });
                entity.id = ++storId;
                this.getRepository().push(angular.copy(entity));

                successCallback(entity, 200, null, null);
        }

        public update(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                if (entity.id == 0) errorCallback({message: "ID Inválido"}, 403, null, null);
                var success = false;
                this.getRepository().some(
                    (item: T, index: number) => {
                        if (item.id == entity.id) {
                            this.getRepository()[index] = angular.copy(entity);
                            success = true;
                            successCallback(entity, 200, null, null);
                            return true;
                        }
                        else return false;
                    });
                if (!success) errorCallback({message: "ID Inexistente"}, 404, null, null);
        }

        public remove(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                var success = false;
                this.getRepository().some(
                    (item: T, index: number) => {
                        if (item.id == entity.id) {
                            this.getRepository().splice(index, 1);
                            success = true;
                            successCallback(entity, 200, null, null);
                            return true;
                        }
                        else return false;
                    });
                if (!success) errorCallback({message: "ID Inexistente"}, 404, null, null);
        }

        public findById(id: number,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                var success = false;
                var retrievedEntity = null;
                this.getRepository().some(
                    (item: T) => {
                        if (item.id == id) {
                            success = true;
                            retrievedEntity = angular.copy(item);
                            return true; // Break the rest of the iteration
                        }
                        else return false;
                    });
                if (success) successCallback(retrievedEntity, 200, null, null);
                else errorCallback({message: "ID Inexistente"}, 404, null, null);
        }

        public list(
            successCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.timeoutService(() => { successCallback(angular.copy(this.getRepository()), 200, null, null); }, 1000);
        }

        public contains(entity: T,
            successCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                if(linqjs.From(this.getRepository()).Contains(entity)) successCallback(true, 200, null, null);
                else errorCallback({message: "Entidade Inexistente"}, 200, null, null);
        }


        public getRepository() {
            return this.repository;
        }
    }
}