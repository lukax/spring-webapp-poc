package com.espindola.lobwebapp.exception.invalidArgument;

import com.espindola.lobwebapp.l10n.MessageKey;

public class ProductInvalidException extends InvalidArgumentException {

	private static final long serialVersionUID = 1L;

	public ProductInvalidException(){
		super(MessageKey.PRODUCTINVALID_EXCEPTION, new String[] {});
	}
}
