package com.espindola.lobwebapp.exception.notFound;

import com.espindola.lobwebapp.l10n.MessageKey;

public class OrderNotFoundException extends NotFoundException {

	private static final long serialVersionUID = 1L;

	public OrderNotFoundException(Long id) {
		super(MessageKey.ORDERNOTFOUND_EXCEPTION,
				new String[] { id.toString() });
	}
}
