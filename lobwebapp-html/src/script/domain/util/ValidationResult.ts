
module domain.util{
	export interface ValidationResult {
		propertyName: string;
		code: number;
		message: string;
	}
}