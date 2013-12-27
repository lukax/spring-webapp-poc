package com.espindola.lobwebapp.exception.invalidArgument;

import java.util.List;

import org.springframework.validation.ObjectError;

import com.espindola.lobwebapp.l10n.MessageKey;

public class StockInvalidException extends InvalidArgumentException {

	private static final long serialVersionUID = 1L;

	public StockInvalidException(List<ObjectError> list){
		super(MessageKey.STOCKINVALID_EXCEPTION, list);
	}
}
