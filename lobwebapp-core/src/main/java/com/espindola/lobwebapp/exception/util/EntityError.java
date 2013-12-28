package com.espindola.lobwebapp.exception.util;

import com.espindola.lobwebapp.l10n.MessageKey;

public class EntityError {
	private MessageKey messageKey;
	private Object[] messageArgs;
	
	public EntityError(MessageKey messageKey){
		this(messageKey, new Object[]{});
	}
	
	public EntityError(MessageKey messageKey, Object[] messageArgs){
		this.messageKey = messageKey;
		this.messageArgs = messageArgs;
	}
	
	public MessageKey getMessageKey() {
		return messageKey;
	}
	public void setMessageKey(MessageKey messageKey) {
		this.messageKey = messageKey;
	}
	public Object[] getMessageArgs() {
		return messageArgs;
	}
	public void setMessageArgs(Object[] messageArgs) {
		this.messageArgs = messageArgs;
	}
}
