package com.espindola.lobwebapp.exception;

import java.util.Locale;

import org.springframework.context.MessageSource;

import com.espindola.lobwebapp.exception.util.ErrorResponse;
import com.espindola.lobwebapp.l10n.MessageKey;

public class LobWebAppException extends RuntimeException {

	private static final long serialVersionUID = -8906012587863340255L;
	private MessageKey messageKey;
	private Object[] messageArgs;
	
	public LobWebAppException() {
		this(MessageKey.LOBWEBAPP_EXCEPTION, new Object[] {});
	}
	
	public LobWebAppException(String message){
		super(message);
	}
	
	protected LobWebAppException(MessageKey messageKey, Object[] messageArgs){
		this.setMessageKey(messageKey);
		this.setMessageArgs(messageArgs);
	}
	
	public ErrorResponse getErrorResponse(MessageSource messageSource, Locale locale){
		return new ErrorResponse(messageSource.getMessage(this.getMessageKey().getKey(), this.getMessageArgs(), locale));
	}

	public Object[] getMessageArgs() {
		return messageArgs;
	}

	protected void setMessageArgs(Object[] messageArgs) {
		this.messageArgs = messageArgs;
	}

	public MessageKey getMessageKey() {
		return messageKey;
	}

	protected void setMessageKey(MessageKey messageKey) {
		this.messageKey = messageKey;
	}
}