package com.espindola.lobwebapp.validation;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Locale;

import org.springframework.context.MessageSource;
import org.springframework.validation.ObjectError;

import com.espindola.lobwebapp.l10n.MessageKey;

public class CustomObjectError extends ObjectError {

	private static final long serialVersionUID = 1L;
	private ErrorCode code;
	private MessageKey validationMessageKey;
	private String propertyName;
	private MessageKey propertyMessageKey;
	private Object[] propertyMessageArgs;

	public CustomObjectError(ErrorCode errorCode,
			MessageKey validationMessageKey, String propertyName,
			Object... propertyMessageArgs) {
		super(propertyName, validationMessageKey.getKey());
		this.code = errorCode;
		this.validationMessageKey = validationMessageKey;
		this.propertyName = propertyName;
		try {
			this.propertyMessageKey = MessageKey
					.valueOf(propertyName.toUpperCase());
		} catch (IllegalArgumentException ex) {
			this.propertyMessageKey = MessageKey.PROPERTY;
		}
		this.propertyMessageArgs = propertyMessageArgs;
	}

	public ValidationResult getValidationResponse(MessageSource messageSource,
			Locale locale) {
		ArrayList<Object> msgArgs = new ArrayList<Object>();
		msgArgs.add(propertyMessageKey.asMessageSourceResolvable());
		msgArgs.addAll(Arrays.asList(propertyMessageArgs));

		String msg = messageSource.getMessage(validationMessageKey.getKey(),
				msgArgs.toArray(), locale);

		ValidationResult validationResult = new ValidationResult();
		validationResult.setCode(code.getCode());
		validationResult.setPropertyName(propertyName);
		validationResult.setMessage(msg);

		return validationResult;
	}
}
