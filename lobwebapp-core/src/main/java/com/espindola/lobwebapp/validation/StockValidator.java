package com.espindola.lobwebapp.validation;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;

import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.validation.base.AbstractEntityValidator;

@Component
public class StockValidator extends AbstractEntityValidator<Stock> {

	@Override
	protected void validateEntity(Stock t, Errors e) {

		validateProduct(t.getProduct(), e);

		validateQuantity(t, e);

		validateMaxQuantity(t, e);

		validateMinQuantity(t, e);

		validateUnit(t, e);

	}

	private void validateUnit(Stock t, Errors errors) {
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "unit",
				MessageKey.STOCKUNITINVALID_VALIDATION.getKey(),
				new Object[] { 3 });
		if (t.getUnit() != null && t.getUnit().length() > 3)
			errors.rejectValue("unit",
					MessageKey.STOCKUNITINVALID_VALIDATION.getKey(),
					new Object[] { 3 }, defaultMessage);
	}

	private void validateMinQuantity(Stock t, Errors errors) {
		if (t.getMinQuantity() != null && t.getMinQuantity() < 0)
			errors.rejectValue("minQuantity",
					MessageKey.STOCKMINQUANTITYINVALID_VALIDATION.getKey(),
					new Object[] { 0 }, defaultMessage);
	}

	private void validateMaxQuantity(Stock t, Errors errors) {
		if (t.getMaxQuantity() != null && t.getMaxQuantity() < 0)
			errors.rejectValue("maxQuantity",
					MessageKey.STOCKMAXQUANTITYINVALID_VALIDATION.getKey(),
					new Object[] { 0 }, defaultMessage);
		if (t.getMinQuantity() != null && t.getMaxQuantity() != null)
			if (t.getMinQuantity() > 0
					&& (t.getMinQuantity() == t.getMaxQuantity()))
				errors.rejectValue("maxQuantity",
						MessageKey.STOCKMAXQUANTITYINVALID_VALIDATION.getKey(),
						new Object[] { t.getMinQuantity() }, defaultMessage);
	}

	private void validateQuantity(Stock t, Errors errors) {
		if (t.getQuantity() == null || t.getQuantity() < 0)
			errors.rejectValue("quantity",
					MessageKey.STOCKQUANTITYINVALID_VALIDATION.getKey(),
					new Object[] { 0 }, defaultMessage);
	}

	private void validateProduct(Product product, Errors errors) {
		// Check just the product's ID since it's not cascading stuff
		if (product == null || product.getId() == null || product.getId() <= 0) {
			errors.rejectValue("product",
					MessageKey.STOCKPRODUCTINVALID_VALIDATION.getKey(),
					defaultMessage);
		}
	}

}
