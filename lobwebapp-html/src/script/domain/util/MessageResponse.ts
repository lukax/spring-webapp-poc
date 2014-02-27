///<reference path="../../reference.d.ts"/>

module domain.util {
    export interface MessageResponse {
        message: string;
    }

    export interface ValidationMessageResponse extends MessageResponse{
    	validations: domain.util.ValidationResult[];
    }
}