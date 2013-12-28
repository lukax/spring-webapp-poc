package com.espindola.lobwebapp.validation.base;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.l10n.MessageKey;

public abstract class AbstractEntityValidator<T extends AbstractEntity> implements Validator {

	protected String defaultMessage = "message not found";
	
	@Override
	public boolean supports(Class<?> clazz) {
		return true;
	}

	@SuppressWarnings("unchecked")
	@Override
	public void validate(Object target, Errors errors) {
		if(target == null){
			errors.reject(MessageKey.ENTITYINVALID_VALIDATION.getKey());
			return;
		}
		T entity = (T)target;
		
		validateId(entity, errors);
		
		validateEntity(entity, errors);
	}

	private void validateId(T entity, Errors errors) {
		if(entity.getId() == null || entity.getId() < 0)
			errors.rejectValue("id", 
					MessageKey.ENTITYIDINVALID_VALIDATION.getKey(), 
					new Object[] { entity.getId() }, defaultMessage);
	}
	
	protected abstract void validateEntity(T t, Errors e);

}
