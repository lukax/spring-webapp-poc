package com.espindola.lobwebapp.validation;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.validation.base.AbstractEntityValidator;

@Component
public class StockValidator extends AbstractEntityValidator<Stock> {

	private Stock t;

	@Override
	protected void validateEntity(Stock t, Errors e) {
		this.t = t;
		validateQuantity("quantity");
		validateMaxQuantity("maxQuantity");
		validateMinQuantity("minQuantity");
		validateUnit("unit");
	}

	private void validateUnit(String fieldName) {
		required(fieldName);
		length(fieldName, 0, 3);
	}

	private void validateMinQuantity(String fieldName) {
		min(fieldName, 0);
	}

	private void validateMaxQuantity(String fieldName) {
		min(fieldName, 0);
		if (t.getMinQuantity() != null && t.getMaxQuantity() != null) {
			if (t.getMinQuantity() > 0 && (t.getMinQuantity() == t.getMaxQuantity()))
				addError(fieldName, MessageKey.VALIDATION_MAX, t.getMinQuantity().toString());
		}
	}

	private void validateQuantity(String fieldName) {
		required(fieldName);
		min(fieldName, 0);
	}

}