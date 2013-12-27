package com.espindola.lobwebapp.exception.invalidArgument;

import java.util.List;

import org.springframework.validation.ObjectError;

import com.espindola.lobwebapp.exception.LobWebAppException;
import com.espindola.lobwebapp.l10n.MessageKey;

public class InvalidArgumentException extends LobWebAppException {

	private static final long serialVersionUID = 1L;
	private List<ObjectError> errors;

	public InvalidArgumentException(){
		super(MessageKey.INVALIDARGUMENT_EXCEPTION, new Object[] {} );
	}

	protected InvalidArgumentException(MessageKey messageKey, List<ObjectError> allErrors) {
		super(messageKey, allErrors.toArray());
		this.errors = allErrors;
	}

	public List<ObjectError> getErrors() {
		return errors;
	}
}