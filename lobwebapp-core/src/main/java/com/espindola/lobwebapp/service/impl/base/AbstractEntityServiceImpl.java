package com.espindola.lobwebapp.service.impl.base;

import java.util.List;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.exception.EntityExistsException;
import com.espindola.lobwebapp.exception.EntityInvalidException;
import com.espindola.lobwebapp.exception.EntityNotFoundException;
import com.espindola.lobwebapp.repository.contract.base.EntityRepository;
import com.espindola.lobwebapp.service.contract.EntityService;

public abstract class AbstractEntityServiceImpl<TEntity extends AbstractEntity>
		implements EntityService<TEntity> {

	private EntityRepository<TEntity> repository;

	public AbstractEntityServiceImpl(EntityRepository<TEntity> repository) {
		this.repository = repository;

	}

	@Override
	public TEntity find(Long id) throws EntityNotFoundException {
		throw_if_entity_not_exists(id);
		return repository.findOne(id);
	}

	@Override
	// @Transactional Spring JPA is already annotated with this
	public void save(TEntity entity) throws EntityExistsException, EntityInvalidException {
		throw_if_entity_is_null(entity);
		throw_if_entity_exists(entity.getId());
		if(entity.getId() != 0)
			throw new EntityInvalidException("Default Id for saving is 0", entity);
		repository.save(entity);
	}

	@Override
	public void update(TEntity entity) throws EntityNotFoundException, EntityInvalidException {
		throw_if_entity_is_null(entity);
		throw_if_entity_not_exists(entity.getId());
		repository.save(entity);
	}

	@Override
	public void remove(Long id) throws EntityNotFoundException {
		throw_if_entity_not_exists(id);
		repository.delete(find(id));
	}

	@Override
	public TEntity get(TEntity entity) throws EntityNotFoundException, EntityInvalidException {
		return find(entity.getId());
	}

	@Override
	public List<TEntity> list() {
		return repository.findAll();
	}

	protected void throw_if_entity_is_null(TEntity entity) throws EntityInvalidException {
		String message;
		if (entity == null) message = "Entity object is null";
		else if(entity.getId() == null) message = "Id field is null";
		else return;
		throw new EntityInvalidException(message);
	}
	protected void throw_if_entity_exists(Long id) throws EntityExistsException {
		if (repository.exists(id))
			throw new EntityExistsException("Entity exists in repository");
	}
	protected void throw_if_entity_not_exists(Long id) throws EntityNotFoundException {
		if(!repository.exists(id))
			throw new EntityNotFoundException("Entity not found in repository");
	}
	
}
