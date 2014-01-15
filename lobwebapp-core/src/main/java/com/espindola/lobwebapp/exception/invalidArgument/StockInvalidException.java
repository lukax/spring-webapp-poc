package com.espindola.lobwebapp.exception.invalidArgument;

import java.util.List;

import org.springframework.validation.ObjectError;

import com.espindola.lobwebapp.exception.util.EntityError;
import com.espindola.lobwebapp.l10n.MessageKey;

public class StockInvalidException extends InvalidArgumentException {

	private static final long serialVersionUID = 1L;

	public StockInvalidException(List<ObjectError> list) {
		super(MessageKey.STOCKINVALID_EXCEPTION, list);
	}

	public StockInvalidException(EntityError error) {
		super(MessageKey.STOCKINVALID_EXCEPTION, error);
	}
}
