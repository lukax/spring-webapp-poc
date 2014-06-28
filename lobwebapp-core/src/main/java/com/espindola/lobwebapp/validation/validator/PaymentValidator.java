package com.espindola.lobwebapp.validation.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.espindola.lobwebapp.domain.Payment;
import com.espindola.lobwebapp.validation.validator.base.AbstractEntityValidator;

@Component
public class PaymentValidator extends AbstractEntityValidator<Payment> {

	@Override
	protected void validateEntity(Payment t, Errors e) {
		validateQuantity("quantity");
		validateStatus("status");
		validateMode("mode");
	}

	private void validateStatus(String propertyName) {
		required(propertyName);
	}

	private void validateMode(String propertyName) {
		required(propertyName);
	}

	private void validateQuantity(String propertyName) {
		required(propertyName);
		min(propertyName, 0);
	}
}