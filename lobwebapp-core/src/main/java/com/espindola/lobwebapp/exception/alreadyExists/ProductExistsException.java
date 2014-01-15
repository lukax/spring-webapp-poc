package com.espindola.lobwebapp.exception.alreadyExists;

import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.l10n.MessageKey;

public class ProductExistsException extends AlreadyExistsException {

	private static final long serialVersionUID = 1L;

	public ProductExistsException(Product product) {
		super(MessageKey.PRODUCTALREADYEXITS_EXCEPTION, new String[] { product
				.toString() });
	}
}
