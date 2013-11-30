package com.espindola.lobwebapp.exception;

import com.espindola.lobwebapp.domain.base.AbstractEntity;

public class EntityInvalidException extends InvalidArgumentException {

	private static final long serialVersionUID = 1L;
	private AbstractEntity entity;

	public EntityInvalidException(String message) {
		super(message);
	}

	public EntityInvalidException(String message, AbstractEntity entity) {
		super(message);
	}
	
	public AbstractEntity getEntity() {
		return entity;
	}

	public void setEntity(AbstractEntity entity) {
		this.entity = entity;
	}
}
