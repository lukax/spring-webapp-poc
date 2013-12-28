package com.espindola.lobwebapp.exception.invalidArgument;

import java.util.List;

import org.springframework.validation.ObjectError;

import com.espindola.lobwebapp.exception.util.EntityError;
import com.espindola.lobwebapp.l10n.MessageKey;

public class OrderInvalidException extends InvalidArgumentException {

	private static final long serialVersionUID = 1L;

	public OrderInvalidException(List<ObjectError> list){
		super(MessageKey.ORDERINVALID_EXCEPTION, list);
	}

	public OrderInvalidException(EntityError entityError) {
		super(MessageKey.ORDERINVALID_EXCEPTION, entityError);
	}
}
