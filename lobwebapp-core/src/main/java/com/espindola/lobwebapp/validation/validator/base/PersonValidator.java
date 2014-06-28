package com.espindola.lobwebapp.validation.validator.base;

import org.springframework.validation.Errors;

import com.espindola.lobwebapp.domain.base.Person;

public abstract class PersonValidator<T extends Person> extends
		AbstractEntityValidator<T> {

	@Override
	protected void validateEntity(T t, Errors e) {
		validateName("name");

		validatePerson(t, e);
	}

	private void validateName(String propertyName) {
		required(propertyName);
		stringLength(propertyName, 5, 100);
	}

	protected abstract void validatePerson(T t, Errors e);

}