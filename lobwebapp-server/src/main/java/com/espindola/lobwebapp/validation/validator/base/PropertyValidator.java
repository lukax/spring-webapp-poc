package com.espindola.lobwebapp.validation.validator.base;

import java.util.Map;

import org.springframework.validation.Errors;

public interface PropertyValidator {
	public void validate(Map<String, String> target, Errors errors);
}
