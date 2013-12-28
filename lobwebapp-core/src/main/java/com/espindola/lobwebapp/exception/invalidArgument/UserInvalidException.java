package com.espindola.lobwebapp.exception.invalidArgument;

import java.util.List;

import org.springframework.validation.ObjectError;

import com.espindola.lobwebapp.l10n.MessageKey;

public class UserInvalidException extends InvalidArgumentException {

	private static final long serialVersionUID = 1L;

	public UserInvalidException(List<ObjectError> list){
		super(MessageKey.USERINVALID_EXCEPTION, list);
	}
}
