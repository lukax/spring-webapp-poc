package com.espindola.lobwebapp.exception.invalidArgument;

import java.util.List;
import java.util.Locale;

import org.springframework.context.MessageSource;
import org.springframework.validation.ObjectError;

import com.espindola.lobwebapp.exception.LobWebAppException;
import com.espindola.lobwebapp.exception.util.EntityError;
import com.espindola.lobwebapp.exception.util.ErrorResponse;
import com.espindola.lobwebapp.l10n.MessageKey;

public class InvalidArgumentException extends LobWebAppException {

	private static final long serialVersionUID = 1L;
	private EntityError entityError;

	public InvalidArgumentException() {
		super(MessageKey.INVALIDARGUMENT_EXCEPTION, new Object[] {});
	}

	protected InvalidArgumentException(MessageKey messageKey,
			List<ObjectError> allErrors) {
		super(messageKey, allErrors.toArray());
	}

	protected InvalidArgumentException(MessageKey messageKey, EntityError error) {
		super(messageKey, new Object[] { error });
		this.entityError = error;
	}

	@Override
	public ErrorResponse getErrorResponse(MessageSource messageSource,
			Locale locale) {
		if (this.entityError != null)
			this.setMessageArgs(new Object[] { messageSource.getMessage(
					this.entityError.getMessageKey().getKey(),
					this.entityError.getMessageArgs(), locale) });
		return super.getErrorResponse(messageSource, locale);
	}
}