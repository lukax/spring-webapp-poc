package com.espindola.lobwebapp.exception;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.exception.base.PersistenceException;

public class EntityInvalidException extends PersistenceException {

	private static final long serialVersionUID = 512445059009951462L;
	private AbstractEntity entity;

	public EntityInvalidException() {
	}

	public EntityInvalidException(String message) {
		super(message);
	}

	public EntityInvalidException(AbstractEntity entity) {
		this.setEntity(entity);

	}

	public EntityInvalidException(String message, AbstractEntity entity) {
		super(message);
	}

	public EntityInvalidException(String message, Throwable cause) {
		super(message, cause);
	}

	public AbstractEntity getEntity() {
		return entity;
	}

	public void setEntity(AbstractEntity entity) {
		this.entity = entity;
	}
}
