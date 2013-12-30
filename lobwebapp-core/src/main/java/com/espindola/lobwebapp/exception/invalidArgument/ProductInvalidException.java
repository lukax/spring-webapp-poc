package com.espindola.lobwebapp.exception.invalidArgument;

import java.util.List;

import org.springframework.validation.ObjectError;

import com.espindola.lobwebapp.exception.util.EntityError;
import com.espindola.lobwebapp.l10n.MessageKey;

public class ProductInvalidException extends InvalidArgumentException {

	private static final long serialVersionUID = 1L;

	public ProductInvalidException(List<ObjectError> errors){
		super(MessageKey.PRODUCTINVALID_EXCEPTION, errors);
	}

	public ProductInvalidException(EntityError entityError) {
		super(MessageKey.PRODUCTINVALID_EXCEPTION, entityError);
	}
}
