package com.espindola.lobwebapp.exception.invalidArgument;

import com.espindola.lobwebapp.l10n.MessageKey;

public class CustomerInvalidException extends InvalidArgumentException {

	private static final long serialVersionUID = 1L;

	public CustomerInvalidException(){
		super(MessageKey.CUSTOMERINVALID_EXCEPTION, new String[] {});
	}
}
