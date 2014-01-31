package com.espindola.lobwebapp.exception;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.springframework.context.MessageSource;
import org.springframework.validation.ObjectError;

import com.espindola.lobwebapp.controller.util.MessageResponse;
import com.espindola.lobwebapp.controller.util.ValidationMessageResponse;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.validation.util.CustomObjectError;
import com.espindola.lobwebapp.validation.util.ValidationResult;

public class InvalidArgumentException extends LobWebAppException {

	private static final long serialVersionUID = 1L;
	private ObjectError[] objectErrors;

	public InvalidArgumentException(MessageKey argumentMessageKey,
			ObjectError... objectErrors) {
		super(argumentMessageKey, objectErrors);
		this.objectErrors = objectErrors;
	}

	@Override
	public MessageResponse getErrorResponse(MessageSource messageSource,
			Locale locale) {
		List<ValidationResult> validationResults = new ArrayList<ValidationResult>();
		for (ObjectError o : objectErrors) {
			if (o instanceof CustomObjectError) {
				validationResults.add(((CustomObjectError) o)
						.getValidationResponse(messageSource, locale));
			} else {
				throw new UnsupportedOperationException("ObjectError has to be of type CustomObjectError");
			}
		}

		ValidationMessageResponse errorResponse = new ValidationMessageResponse();
		errorResponse.setMessage(super.getErrorResponse(messageSource, locale)
				.getMessage());
		errorResponse.setValidations(validationResults);

		return errorResponse;
	}

}