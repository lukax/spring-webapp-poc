package com.espindola.lobwebapp.validation.validator;

import java.util.regex.Pattern;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.validation.validator.base.AbstractEntityValidator;

@Component
public class ProductValidator extends AbstractEntityValidator<Product> {

	@Override
	protected void validateEntity(Product t, Errors e) {
		validateProperty("ncm", e);
		validateProperty("category", e);
		validateProperty("price", e);
		validateProperty("costPrice", e);
		validateProperty("name", e);
	}

	protected void validateProperty(String property, Errors e) {
		switch (property) {
		case "ncm":
			pattern(property, Pattern.compile("^\\d\\d\\d\\d.\\d\\d.\\d\\d$"));
			break;
		case "category":
			stringLength(property, 5, 20);
			break;
		case "price":
			required(property);
			range(property, 0, 10000);
			break;
		case "costPrice":
			range(property, 0, 10000);
			break;
		case "name":
			required(property);
			stringLength(property, 5, 100);
			break;
		}
	}

}