package com.espindola.lobwebapp.validation.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.espindola.lobwebapp.domain.Customer;
import com.espindola.lobwebapp.validation.validator.base.AbstractEntityValidator;

@Component
public class CustomerValidator extends AbstractEntityValidator<Customer> {

	@Override
	protected void validateEntity(Customer t, Errors e) {
		validateProperty("name", e);
	}

	@Override
	protected void validateProperty(String property, Errors e) {
		switch (property) {
		case "name":
			required(property);
			stringLength(property, 5, 100);
			break;
		}
	}

}
