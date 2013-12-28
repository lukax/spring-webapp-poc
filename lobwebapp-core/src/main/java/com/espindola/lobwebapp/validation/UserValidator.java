package com.espindola.lobwebapp.validation;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;

import com.espindola.lobwebapp.domain.User;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.validation.base.PersonValidator;

@Component
public class UserValidator extends PersonValidator<User> {

	@Override
	protected void validatePerson(User t, Errors e) {
		
		validateUsername(t, e);
		
		validatePassword(t, e);
		
	}

	private void validatePassword(User t, Errors e) {
		ValidationUtils.rejectIfEmptyOrWhitespace(e, "password", MessageKey.USERPASSWORDINVALID_VALIDATION.getKey());
		if(t.getPassword() != null && (t.getPassword().length() < 8 || t.getPassword().length() > 20))
			e.rejectValue("password", MessageKey.USERPASSWORDINVALID_VALIDATION.getKey(),
					new Object[] { 8, 20 }, defaultMessage);
	}

	private void validateUsername(User t, Errors e) {
		ValidationUtils.rejectIfEmptyOrWhitespace(e, "username", MessageKey.USERUSERNAMEINVALID_VALIDATION.getKey());
		if(t.getUsername() != null && (t.getUsername().length() < 6 || t.getUsername().length() > 20))
			e.rejectValue("username", MessageKey.USERUSERNAMEINVALID_VALIDATION.getKey(),
					new Object[]{ 6, 20 }, defaultMessage);
	}

}