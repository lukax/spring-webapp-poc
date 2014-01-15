package com.espindola.lobwebapp.exception.alreadyExists;

import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.l10n.MessageKey;

public class StockExistsException extends AlreadyExistsException {

	private static final long serialVersionUID = 1L;

	public StockExistsException(Stock entity) {
		super(MessageKey.STOCKALREADYEXITS_EXCEPTION, new String[] { entity
				.toString() });
	}
}
