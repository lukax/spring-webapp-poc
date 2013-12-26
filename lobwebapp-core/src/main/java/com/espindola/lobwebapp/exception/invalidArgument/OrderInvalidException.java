package com.espindola.lobwebapp.exception.invalidArgument;

import com.espindola.lobwebapp.l10n.MessageKey;

public class OrderInvalidException extends InvalidArgumentException {

	private static final long serialVersionUID = 1L;

	public OrderInvalidException(){
		super(MessageKey.ORDERINVALID_EXCEPTION, new String[] {});
	}
}
