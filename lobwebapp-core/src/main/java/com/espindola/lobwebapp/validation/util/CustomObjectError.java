package com.espindola.lobwebapp.validation.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Locale;

import org.springframework.context.MessageSource;
import org.springframework.validation.ObjectError;

import com.espindola.lobwebapp.l10n.MessageKey;

public class CustomObjectError extends ObjectError {

	private static final long serialVersionUID = 1L;
	private ErrorCode code;
	private MessageKey validationMessage;
	private String propertyName;
	private MessageKey propertyMessage;
	private String[] propertyMessageArgs;

	public CustomObjectError(ErrorCode code, MessageKey validationMessage, String propertyName, MessageKey propertyMessage, String... propertyMessageArgs) {
		super(propertyName, validationMessage.getKey());
		this.code = code;
		this.validationMessage = validationMessage;
		this.propertyName = propertyName;
		this.propertyMessage = propertyMessage;
		this.propertyMessageArgs = propertyMessageArgs;
	}

	public ValidationResult getValidationResponse(MessageSource messageSource, Locale locale){
		ArrayList<String> msgArgs = new ArrayList<String>();
		msgArgs.add(propertyMessage.getKey());
		msgArgs.addAll(Arrays.asList(propertyMessageArgs));
		
		String msg = messageSource.getMessage(validationMessage.getKey(), msgArgs.toArray(), locale);
		
		ValidationResult validationResult = new ValidationResult();
		validationResult.setCode(code.getCode());
		validationResult.setPropertyName(propertyName);
		validationResult.setMessage(msg);
		
		return validationResult;
	}
}
