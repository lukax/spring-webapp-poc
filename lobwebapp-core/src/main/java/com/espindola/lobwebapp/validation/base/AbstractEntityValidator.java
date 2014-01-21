package com.espindola.lobwebapp.validation.base;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Pattern;

import org.springframework.util.StringUtils;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.l10n.MessageKey;

public abstract class AbstractEntityValidator<T extends AbstractEntity>
		implements Validator {

	protected String defaultMessage = "message not found";
	private Errors errors;

	@Override
	public boolean supports(Class<?> clazz) {
		return true;
	}

	@SuppressWarnings("unchecked")
	@Override
	public void validate(Object target, Errors errors) {
		this.errors = errors;
		if (target == null) {
			errors.reject(MessageKey.VALIDATION_INVALID.getKey());
			return;
		}
		T entity = (T) target;

		validateEntity(entity, errors);
	}
	
	protected void required(String fieldName){
		Object fieldValue = this.errors.getFieldValue(fieldName);
		if(fieldValue == null || !StringUtils.hasText(fieldValue.toString())){
			this.addError(fieldName, MessageKey.VALIDATION_REQUIRED);
		}
	}
	
	protected void length(String fieldName, int min, int max){
		Object fieldValue = this.errors.getFieldValue(fieldName);
		if(fieldValue == null) return;
		if(fieldValue.toString().length() < min || fieldValue.toString().length() > max){
			this.addError(fieldName, MessageKey.VALIDATION_STRINGLENGTH);
		}
	}
	
	protected void min(String fieldName, double min){
		Object fieldValue = this.errors.getFieldValue(fieldName);
		if(fieldValue == null) return;
		double number = Double.valueOf(fieldName.toString());
		if(number < min){
			this.addError(fieldName, MessageKey.VALIDATION_MIN);
		}
	}
	
	protected void max(String fieldName, double max){
		Object fieldValue = this.errors.getFieldValue(fieldName);
		if(fieldValue == null) return;
		double number = Double.valueOf(fieldName.toString());
		if(number > max){
			this.addError(fieldName, MessageKey.VALIDATION_MAX);
		}
	}
	
	protected void range(String fieldName, double min, double max){
		Object fieldValue = this.errors.getFieldValue(fieldName);
		if(fieldValue == null) return;
		double number = Double.valueOf(fieldName.toString());
		if(number < min || number > max){
			this.addError(fieldName, MessageKey.VALIDATION_SIZE);
		}
	}
	
	protected void dateMin(String fieldName, double min){
		Object fieldValue = this.errors.getFieldValue(fieldName);
		if(fieldValue == null) return;
		try {
			Date date = new SimpleDateFormat().parse(fieldValue.toString());
			if(date.getTime() < min)
				this.addError(fieldName, MessageKey.VALIDATION_MIN);
		} catch (ParseException e) {
			return;
		}
		
	}
	
	protected void pattern(String fieldName, Pattern pattern) {
		Object fieldValue = this.errors.getFieldValue(fieldName);
		if(fieldValue == null) return;
		if(!pattern.matcher(fieldValue.toString()).matches()){
			this.addError(fieldName, MessageKey.VALIDATION_PATTERN);
		}
	}

	protected void addError(String fieldName, MessageKey validationKey, String... args) {
		
	}

	protected abstract void validateEntity(T t, Errors e);

}
