package com.espindola.lobwebapp.validation;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.validation.base.AbstractEntityValidator;
import com.espindola.lobwebapp.validation.util.ErrorCode;

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

	private void validateUnit(String propertyName) {
		required(propertyName);
		stringLength(propertyName, 0, 3);
	}

	private void validateMinQuantity(String propertyName) {
		min(propertyName, 0);
	}

	private void validateMaxQuantity(String propertyName) {
		min(propertyName, 0);
		if (t.getMinQuantity() != null && t.getMaxQuantity() != null) {
			if (t.getMinQuantity() > 0
					&& (t.getMinQuantity() == t.getMaxQuantity()))
				addError(propertyName, ErrorCode.INVALID,
						MessageKey.VALIDATION_MAX, t.getMinQuantity()
								.toString());
		}
	}

	private void validateQuantity(String propertyName) {
		required(propertyName);
		min(propertyName, 0);
	}

}