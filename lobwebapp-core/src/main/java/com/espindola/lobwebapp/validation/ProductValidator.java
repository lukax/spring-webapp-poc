package com.espindola.lobwebapp.validation;

import java.util.regex.Pattern;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;

import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.validation.base.AbstractEntityValidator;

@Component
public class ProductValidator extends AbstractEntityValidator<Product> {
	
	@Override
	protected void validateEntity(Product t, Errors e) {
		
		validateName(t, e);
		
		validateCostPrice(t, e);
		
		validatePrice(t, e);
		
		validateCategory(t, e);
		
		validateNcm(t, e);
		
		validateRegisterDate(t, e);
		
	}

	private void validateRegisterDate(Product t, Errors e) {
		if(t.getRegisterDate() == null || t.getRegisterDate().getTime() < 1357005600000L) // 1/1/2013
			e.rejectValue("registerDate", MessageKey.PRODUCTREGISTERDATEINVALID_VALIDATION.getKey());
	}

	private void validateNcm(Product t, Errors e) {
		if(t.getNcm() != null && t.getNcm() != "" && !verifyNcm(t.getNcm()))
			e.rejectValue("ncm", MessageKey.PRODUCTNCMINVALID_VALIDATION.getKey());
	}

	private void validateCategory(Product t, Errors e) {
		if(t.getCategory() != null && t.getCategory() != "" && (t.getCategory().length() < 5 || t.getCategory().length() > 20))
			e.rejectValue("category", 
					MessageKey.PRODUCTCATEGORYINVALID_VALIDATION.getKey(),
					new Object[] {5, 20}, defaultMessage);
	}

	private void validatePrice(Product t, Errors e) {
		if(t.getPrice() == null || t.getPrice() <= 0)
			e.rejectValue("price", MessageKey.PRODUCTPRICEINVALID_VALIDATION.getKey());
	}

	private void validateCostPrice(Product t, Errors e) {
		if(t.getCostPrice() != null && t.getCostPrice() < 0)
			e.rejectValue("costPrice", MessageKey.PRODUCTCOSTPRICEINVALID_VALIDATION.getKey());
	}

	private void validateName(Product t, Errors e) {
		ValidationUtils.rejectIfEmptyOrWhitespace(e, "name", MessageKey.PRODUCTNAMEINVALID_VALIDATION.getKey(), new Object[] { 3, 100 });
		if(t.getName() == null || t.getName().length() < 5 || t.getName().length() > 100)
			e.rejectValue("name", 
					MessageKey.PRODUCTNAMEINVALID_VALIDATION.getKey(), 
					new Object[] { 5, 100 }, defaultMessage);
	}
	
	private boolean verifyNcm(String ncm){
		return Pattern.compile("^\\d\\d\\d\\d.\\d\\d.\\d\\d$").matcher(ncm).matches();
	}

}