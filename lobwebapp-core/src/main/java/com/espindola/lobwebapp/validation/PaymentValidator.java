package com.espindola.lobwebapp.validation;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.espindola.lobwebapp.domain.Payment;
import com.espindola.lobwebapp.validation.base.AbstractEntityValidator;

@Component
public class PaymentValidator extends AbstractEntityValidator<Payment> {

	@Override
	protected void validateEntity(Payment t, Errors e) {
		validateQuantity("quantity");
		validateStatus("status");
		validateMode("mode");
	}

	private void validateStatus(String fieldName) {
		required(fieldName);
	}

	private void validateMode(String fieldName) {
		required(fieldName);
	}

	private void validateQuantity(String fieldName) {
		required(fieldName);
		min(fieldName, 0);
	}
}