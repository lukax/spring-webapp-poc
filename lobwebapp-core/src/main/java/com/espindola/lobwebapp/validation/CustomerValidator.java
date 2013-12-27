package com.espindola.lobwebapp.validation;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.espindola.lobwebapp.domain.Customer;
import com.espindola.lobwebapp.validation.base.PersonValidator;

@Component
public class CustomerValidator extends PersonValidator<Customer> {

	@Override
	protected void validatePerson(Customer t, Errors e) {
	}

}
