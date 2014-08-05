///<reference path="../../reference.ts"/>

module entity {
    export interface EntityService<T extends AbstractEntity> {
        save(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string) => any,
            errorCallback: (data: ValidationMessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;

        update(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: ValidationMessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;

        remove(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;

        find(id: number,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;

        list(successCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;

        list(successCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            pageable: Page): void;

        exists(entity: T,
            successCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;

        default(): T;
    }
}
