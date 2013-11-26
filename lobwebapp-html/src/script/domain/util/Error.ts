
module domain.util {
    export interface Error {
        message: string;
        description?: string;
        level?: string;
    }
}