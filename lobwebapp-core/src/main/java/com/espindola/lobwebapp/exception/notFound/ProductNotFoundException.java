package com.espindola.lobwebapp.exception.notFound;

import com.espindola.lobwebapp.l10n.MessageKey;

public class ProductNotFoundException extends NotFoundException {

	private static final long serialVersionUID = 1L;

	public ProductNotFoundException(Long id){
		super(MessageKey.PRODUCTNOTFOUND_EXCEPTION, new String[] { id.toString() });
	}
}
