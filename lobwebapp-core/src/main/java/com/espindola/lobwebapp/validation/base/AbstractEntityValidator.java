package com.espindola.lobwebapp.validation.base;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Pattern;

import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.validation.util.CustomObjectError;
import com.espindola.lobwebapp.validation.util.ErrorCode;

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

	protected void required(String propertyName) {
		Object value = this.errors.getFieldValue(propertyName);
		if (value == null || !StringUtils.hasText(value.toString())) {
			this.addError(propertyName, ErrorCode.REQUIRED,
					MessageKey.VALIDATION_REQUIRED);
		}
	}

	protected void stringLength(String propertyName, int min, int max) {
		Object value = this.errors.getFieldValue(propertyName);
		if (value == null || !StringUtils.hasText(value.toString()))
			return;
		if (value.toString().length() < min || value.toString().length() > max) {
			this.addError(propertyName, ErrorCode.INVALID,
					MessageKey.VALIDATION_STRINGLENGTH, min, max);
		}
	}

	protected void min(String propertyName, double min) {
		Object value = this.errors.getFieldValue(propertyName);
		if (value == null || !StringUtils.hasText(value.toString()))
			return;
		Double number = Double.parseDouble(value.toString());
		if (number < min) {
			this.addError(propertyName, ErrorCode.INVALID,
					MessageKey.VALIDATION_MIN, min);
		}
	}

	protected void max(String propertyName, double max) {
		Object value = this.errors.getFieldValue(propertyName);
		if (value == null || !StringUtils.hasText(value.toString()))
			return;
		Double number = Double.parseDouble(value.toString());
		if (number > max) {
			this.addError(propertyName, ErrorCode.INVALID,
					MessageKey.VALIDATION_MAX, max);
		}
	}

	protected void range(String propertyName, double min, double max) {
		Object value = this.errors.getFieldValue(propertyName);
		if (value == null || !StringUtils.hasText(value.toString()))
			return;
		Double number = Double.parseDouble(value.toString());
		if (number < min || number > max) {
			this.addError(propertyName, ErrorCode.INVALID,
					MessageKey.VALIDATION_SIZE, min, max);
		}
	}

	protected void dateMin(String propertyName, double min) {
		Object value = this.errors.getFieldValue(propertyName);
		if (value == null || !StringUtils.hasText(value.toString()))
			return;
		try {
			Date date = new SimpleDateFormat().parse(value.toString());
			if (date.getTime() < min)
				this.addError(propertyName, ErrorCode.INVALID,
						MessageKey.VALIDATION_MIN, min);
		} catch (ParseException e) {
			return;
		}

	}

	protected void pattern(String propertyName, Pattern pattern) {
		Object value = this.errors.getFieldValue(propertyName);
		if (value == null || !StringUtils.hasText(value.toString()))
			return;
		if (!pattern.matcher(value.toString()).matches()) {
			this.addError(propertyName, ErrorCode.INVALID,
					MessageKey.VALIDATION_PATTERN);
		}
	}

	protected void firstGreaterThanSecond(String firstProperty, String secondProperty,
			boolean orEqual) {
		Object valueFirst = this.errors.getFieldValue(firstProperty);
		Object valueSecond = this.errors.getFieldValue(secondProperty);
		if (valueFirst == null || valueSecond == null
				|| !StringUtils.hasText(valueFirst.toString())
				|| !StringUtils.hasText(valueSecond.toString()))
			return;
		Double numberFirst = Double.parseDouble(valueFirst.toString());
		Double numberSecond = Double.parseDouble(valueSecond.toString());
		
		if (orEqual && numberFirst.compareTo(numberSecond) < 0) {
			addError(firstProperty, ErrorCode.INVALID, MessageKey.VALIDATION_MIN, numberSecond);
		}
		if(!orEqual && numberFirst.compareTo(numberSecond) <= 0){
			//TODO: chain with message greater than args
			addError(firstProperty, ErrorCode.INVALID, MessageKey.VALIDATION_MIN, numberSecond);
		}
	}

	protected void firstLesserThanSecond(String firstProperty, String secondProperty,
			boolean orEqual) {
		Object valueFirst = this.errors.getFieldValue(firstProperty);
		Object valueSecond = this.errors.getFieldValue(secondProperty);
		if (valueFirst == null || valueSecond == null
				|| !StringUtils.hasText(valueFirst.toString())
				|| !StringUtils.hasText(valueSecond.toString()))
			return;
		Double numberFirst = Double.parseDouble(valueFirst.toString());
		Double numberSecond = Double.parseDouble(valueSecond.toString());
		
		if (orEqual && numberFirst.compareTo(numberSecond) > 0) {
			addError(firstProperty, ErrorCode.INVALID, MessageKey.VALIDATION_MAX, numberSecond);
		}
		if(!orEqual && numberFirst.compareTo(numberSecond) <= 0){
			//TODO: chain messageKey with message less than args
			addError(firstProperty, ErrorCode.INVALID, MessageKey.VALIDATION_MAX, numberSecond);	
		}
	}

	protected void addError(String propertyName, ErrorCode errorCode,
			MessageKey validationKey, Object... args) {
		if (errors instanceof BindingResult) {
			((BindingResult) errors).addError(new CustomObjectError(errorCode,
					validationKey, propertyName, args));
		}
	}

	protected abstract void validateEntity(T t, Errors e);

}
