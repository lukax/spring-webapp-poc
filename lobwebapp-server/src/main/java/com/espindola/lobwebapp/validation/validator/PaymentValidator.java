package com.espindola.lobwebapp.validation.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.espindola.lobwebapp.domain.Payment;
import com.espindola.lobwebapp.validation.validator.base.AbstractEntityValidator;

@Component
public class PaymentValidator extends AbstractEntityValidator<Payment> {

	@Override
	protected void validateEntity(Payment t, Errors e) {
		validateProperty("mode", e);
		validateProperty("status", e);
		validateProperty("quantity", e);
	}

	@Override
	protected void validateProperty(String property, Errors e) {
		switch (property) {
		case "mode":
			required(property);
			break;
		case "status":
			required(property);
			break;
		case "quantity":
			required(property);
			min(property, 0);
			break;
		}
	}
}