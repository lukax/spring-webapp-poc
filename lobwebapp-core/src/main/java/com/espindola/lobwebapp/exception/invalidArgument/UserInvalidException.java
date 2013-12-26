package com.espindola.lobwebapp.exception.invalidArgument;

import com.espindola.lobwebapp.l10n.MessageKey;

public class UserInvalidException extends InvalidArgumentException {

	private static final long serialVersionUID = 1L;

	public UserInvalidException(){
		super(MessageKey.USERINVALID_EXCEPTION, new String[] {});
	}
}
