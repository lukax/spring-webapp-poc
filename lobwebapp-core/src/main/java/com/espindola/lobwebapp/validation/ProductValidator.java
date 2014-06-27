package com.espindola.lobwebapp.validation;

import java.util.regex.Pattern;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.validation.base.AbstractEntityValidator;

@Component
public class ProductValidator extends AbstractEntityValidator<Product> {

	@Override
	protected void validateEntity(Product t, Errors e) {
		validateName("name");
		validateCostPrice("costPrice");
		validatePrice("price");
		validateCategory("category");
		validateNcm("ncm");
	}

	private void validateNcm(String propertyName) {
		pattern(propertyName, Pattern.compile("^\\d\\d\\d\\d.\\d\\d.\\d\\d$"));
	}

	private void validateCategory(String propertyName) {
		stringLength(propertyName, 5, 20);
	}

	private void validatePrice(String propertyName) {
		required(propertyName);
		range(propertyName, 0, 10000);
	}

	private void validateCostPrice(String propertyName) {
		range(propertyName, 0, 10000);
	}

	private void validateName(String propertyName) {
		required(propertyName);
		stringLength(propertyName, 5, 100);
	}

}