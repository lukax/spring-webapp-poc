///<reference path="../reference.ts"/>

module domain {
    export interface AuthToken {
        access_token: string; 
        token_type: string; 
        refresh_token: string;
        expires_in: number;
    }
}