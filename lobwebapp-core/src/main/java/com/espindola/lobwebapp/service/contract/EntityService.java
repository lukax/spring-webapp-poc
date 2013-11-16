package com.espindola.lobwebapp.service.contract;

import java.util.List;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.exception.EntityExistsException;
import com.espindola.lobwebapp.exception.EntityInvalidException;
import com.espindola.lobwebapp.exception.EntityNotFoundException;

public interface EntityService<TEntity extends AbstractEntity> {
	
	void save(TEntity entity) throws EntityExistsException, EntityInvalidException;
	void update(TEntity entity) throws EntityNotFoundException, EntityInvalidException;
	void remove(Long id) throws EntityNotFoundException;
	TEntity find(Long id) throws EntityNotFoundException;
	TEntity get(TEntity entity) throws EntityNotFoundException, EntityInvalidException;
	List<TEntity> list();
}
