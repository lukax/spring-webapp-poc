///<reference path="../../reference.ts"/>

module entity {
    export interface MessageResponse {
        message: string;
    }

    export interface ValidationMessageResponse extends MessageResponse {
    	validations: ValidationResult[];
    }
}
