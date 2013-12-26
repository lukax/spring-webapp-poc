package com.espindola.lobwebapp.exception.invalidArgument;

import com.espindola.lobwebapp.l10n.MessageKey;

public class StockInvalidException extends InvalidArgumentException {

	private static final long serialVersionUID = 1L;

	public StockInvalidException(){
		super(MessageKey.STOCKINVALID_EXCEPTION, new String[] {});
	}
}
