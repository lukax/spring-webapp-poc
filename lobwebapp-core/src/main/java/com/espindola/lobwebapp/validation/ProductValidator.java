package com.espindola.lobwebapp.validation;

import java.util.regex.Pattern;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.l10n.MessageKey;

@Component
public class ProductValidator implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return Product.class.isAssignableFrom(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		Product t = (Product)target;
		String defaultMessage = "message not found";

		if(t.getId() == null || t.getId() < 0)
			errors.rejectValue("id", 
					MessageKey.PRODUCTIDINVALID_VALIDATION.getMessageKey(), 
					new Object[] { t.getId() }, defaultMessage);
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "name", MessageKey.PRODUCTNAMEINVALID_VALIDATION.getMessageKey(), new Object[] { 3, 100 });
		if(t.getName().length() < 5 || t.getName().length() > 100)
			errors.rejectValue("name", 
					MessageKey.PRODUCTNAMEINVALID_VALIDATION.getMessageKey(), 
					new Object[] { 5, 100 }, defaultMessage);
		
		if(t.getCostPrice() != null && t.getCostPrice() < 0)
			errors.rejectValue("costPrice", MessageKey.PRODUCTCOSTPRICEINVALID_VALIDATION.getMessageKey());
		
		if(t.getPrice() == null || t.getPrice() <= 0)
			errors.rejectValue("price", MessageKey.PRODUCTPRICEINVALID_VALIDATION.getMessageKey());
		
		if(t.getCategory() != null && t.getCategory() != "" && (t.getCategory().length() < 5 || t.getCategory().length() > 20))
			errors.rejectValue("category", 
					MessageKey.PRODUCTCATEGORYINVALID_VALIDATION.getMessageKey(),
					new Object[] {5, 20}, defaultMessage);
		
		if(t.getNcm() != null && t.getNcm() != "" && !verifyNcm(t.getNcm()))
			errors.rejectValue("ncm", MessageKey.PRODUCTNCMINVALID_VALIDATION.getMessageKey());
	}
	
	private boolean verifyNcm(String ncm){
		return Pattern.compile("^\\d\\d\\d\\d.\\d\\d.\\d\\d$").matcher(ncm).matches();
	}
}