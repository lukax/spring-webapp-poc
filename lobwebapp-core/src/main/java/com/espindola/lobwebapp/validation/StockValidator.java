package com.espindola.lobwebapp.validation;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.validation.base.AbstractEntityValidator;

@Component
public class StockValidator extends AbstractEntityValidator<Stock> {

	@Override
	protected void validateEntity(Stock t, Errors e) {
		required("quantity");
		range("quantity", 0, 1000);
		
		range("maxQuantity", 0, 1000);
		
		range("minQuantity", 0, 1000);
	
		required("unit");
		stringLength("unit", 0, 10);
		
		firstGreaterThanSecond("maxQuantity", "minQuantity", false);
		
		firstGreaterThanSecond("quantity", "minQuantity", true);
		firstLesserThanSecond("quantity", "maxQuantity", true);
	}

}