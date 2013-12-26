package com.espindola.lobwebapp.service.impl.base;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.exception.alreadyExists.AlreadyExistsException;
import com.espindola.lobwebapp.exception.invalidArgument.InvalidArgumentException;
import com.espindola.lobwebapp.exception.notFound.NotFoundException;
import com.espindola.lobwebapp.repository.contract.base.EntityRepository;
import com.espindola.lobwebapp.service.contract.base.EntityService;

public abstract class AbstractEntityServiceImpl<T extends AbstractEntity> implements EntityService<T> {

	private EntityRepository<T> repository;

	@Autowired
	public AbstractEntityServiceImpl(EntityRepository<T> repository) {
		this.repository = repository;

	}

	@Override
	public T find(Long id) throws NotFoundException {
		throw_if_entity_not_exists(id);
		return repository.findOne(id);
	}

	@Override
	public T save(T entity) throws AlreadyExistsException, InvalidArgumentException {
		throw_if_entity_is_null(entity);
		throw_if_entity_exists(entity.getId());
		if(entity.getId() != 0)
			throw new AlreadyExistsException();
		return repository.save(entity);
	}

	@Override
	public T update(T entity) throws NotFoundException, InvalidArgumentException {
		throw_if_entity_is_null(entity);
		throw_if_entity_not_exists(entity.getId());
		return repository.save(entity);
	}

	@Override
	public T remove(Long id) throws NotFoundException {
		throw_if_entity_not_exists(id);
		T retrievedEntity = find(id);
		repository.delete(find(id));
		return retrievedEntity;
	}

	@Override
	public Boolean exists(T entity) throws InvalidArgumentException {
		try {
			T retrievedEntity = find(entity.getId());		
			if(retrievedEntity.equals(entity))
				return true;
			return false;
		} catch (NotFoundException e) {
			return false;
		}
	}

	@Override
	public List<T> findAll() {
		return repository.findAll();
	}
	
	@Override
	public Page<T> findAll(Pageable p) {
		return repository.findAll(p);
	}

	protected void throw_if_entity_is_null(T entity) throws InvalidArgumentException {
		if (entity == null || entity.getId() == null)
		throw new InvalidArgumentException();
	}
	protected void throw_if_entity_exists(Long id) throws AlreadyExistsException {
		if (repository.exists(id))
			throw new AlreadyExistsException();
	}
	protected void throw_if_entity_not_exists(Long id) throws NotFoundException {
		if(!repository.exists(id))
			throw new NotFoundException();
	}
	
}
