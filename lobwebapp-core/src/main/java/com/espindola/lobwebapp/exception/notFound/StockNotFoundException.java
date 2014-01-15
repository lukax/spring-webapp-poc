package com.espindola.lobwebapp.exception.notFound;

import com.espindola.lobwebapp.l10n.MessageKey;

public class StockNotFoundException extends NotFoundException {

	private static final long serialVersionUID = 1L;

	public StockNotFoundException(Long id) {
		super(MessageKey.STOCKNOTFOUND_EXCEPTION,
				new String[] { id.toString() });
	}
}
