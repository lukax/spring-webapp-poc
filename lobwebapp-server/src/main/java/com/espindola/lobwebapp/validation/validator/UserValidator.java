package com.espindola.lobwebapp.validation.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.espindola.lobwebapp.domain.User;
import com.espindola.lobwebapp.validation.validator.base.AbstractEntityValidator;

@Component
public class UserValidator extends AbstractEntityValidator<User> {

	@Override
	protected void validateEntity(User entity, Errors e) {
		validateProperty("username", e);
		validateProperty("password", e);
		validateProperty("name", e);
	}

	@Override
	protected void validateProperty(String property, Errors e) {
		switch (property) {
		case "username":
			required(property);
			stringLength(property, 6, 20);
			break;
		case "password":
			required(property);
			stringLength(property, 8, 20);
			break;
		case "name":
			required(property);
			stringLength(property, 5, 100);
			break;
		}

	}

}