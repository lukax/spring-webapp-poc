package com.espindola.lobwebapp.controller.util;

import java.util.Collections;
import java.util.List;

import com.espindola.lobwebapp.validation.util.ValidationResult;

public class ValidationMessageResponse extends MessageResponse {
	private List<ValidationResult> validations = Collections.emptyList();

	public List<ValidationResult> getValidations() {
		return validations;
	}

	public void setValidations(List<ValidationResult> validations) {
		this.validations = validations;
	}

}
