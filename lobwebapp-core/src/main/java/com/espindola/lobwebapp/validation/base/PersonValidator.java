package com.espindola.lobwebapp.validation.base;

import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;

import com.espindola.lobwebapp.domain.base.Person;
import com.espindola.lobwebapp.l10n.MessageKey;

public abstract class PersonValidator<T extends Person> extends AbstractEntityValidator<T> {

	@Override
	protected void validateEntity(T t, Errors e) {
		
		validateName(t, e);
	
	}

	private void validateName(T t, Errors e) {
		ValidationUtils.rejectIfEmptyOrWhitespace(e, "name", MessageKey.PERSONNAMEINVALID_VALIDATION.getKey(), new Object[]{ 5, 100} );
		if(t.getName() == null || t.getName().length() < 5 || t.getName().length() > 100)
			e.rejectValue("name", MessageKey.PERSONNAMEINVALID_VALIDATION.getKey(),
					new Object[]{ 5, 100 }, defaultMessage);
		validatePerson(t, e);
	}
	
	protected abstract void validatePerson(T t, Errors e);

}