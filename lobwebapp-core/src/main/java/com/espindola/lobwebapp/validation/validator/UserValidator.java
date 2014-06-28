package com.espindola.lobwebapp.validation.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.espindola.lobwebapp.domain.User;
import com.espindola.lobwebapp.validation.validator.base.PersonValidator;

@Component
public class UserValidator extends PersonValidator<User> {

	@Override
	protected void validatePerson(User t, Errors e) {
		validateUsername("username");
		validatePassword("password");
	}

	private void validatePassword(String propertyName) {
		required(propertyName);
		stringLength(propertyName, 8, 20);
	}

	private void validateUsername(String propertyName) {
		required(propertyName);
		stringLength(propertyName, 6, 20);
	}

}