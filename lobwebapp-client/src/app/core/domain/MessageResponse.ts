///<reference path="../../reference.ts"/>

module core {
    export interface MessageResponse {
        message: string;
    }

    export interface ValidationMessageResponse extends MessageResponse {
    	validations: ValidationResult[];
    }
}
