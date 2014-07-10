package com.espindola.lobwebapp.validation.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.validation.validator.base.AbstractEntityValidator;

@Component
public class StockValidator extends AbstractEntityValidator<Stock> {

	@Override
	protected void validateEntity(Stock t, Errors e) {
		validateProperty("quantity", e);
		validateProperty("maxQuantity", e);
		validateProperty("minQuantity", e);
		validateProperty("unit", e);
		
		firstGreaterThanSecond("maxQuantity", "minQuantity", false);
		firstGreaterThanSecond("quantity", "minQuantity", true);
		firstLesserThanSecond("quantity", "maxQuantity", true);
	}

	@Override
	protected void validateProperty(String property, Errors e) {
		switch(property){
		case "quantity":		
			required("quantity");
			range("quantity", 0, 1000);
			break;
		case "maxQuantity":		
			range("maxQuantity", 0, 1000);
			break;
		case "minQuantity":
			range("minQuantity", 0, 1000);
			break;
		case "unit":		
			required("unit");
			stringLength("unit", 0, 10);
			break;
		}
	}

}