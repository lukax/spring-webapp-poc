package com.espindola.lobwebapp.exception.alreadyExists;

import com.espindola.lobwebapp.domain.Order;
import com.espindola.lobwebapp.l10n.MessageKey;

public class OrderExistsException extends AlreadyExistsException {

	private static final long serialVersionUID = 1L;

	public OrderExistsException(Order entity) {
		super(MessageKey.ORDERALREADYEXITS_EXCEPTION, new String[]{ entity.toString() });
	}
}
