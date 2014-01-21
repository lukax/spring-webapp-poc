package com.espindola.lobwebapp.validation;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.espindola.lobwebapp.domain.User;
import com.espindola.lobwebapp.validation.base.PersonValidator;

@Component
public class UserValidator extends PersonValidator<User> {

	@Override
	protected void validatePerson(User t, Errors e) {
		validateUsername("username");
		validatePassword("password");
	}

	private void validatePassword(String fieldName) {
		required(fieldName);
		length(fieldName, 8, 20);
	}

	private void validateUsername(String fieldName) {
		required(fieldName);
		length(fieldName, 6, 20);
	}

}