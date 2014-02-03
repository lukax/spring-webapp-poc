package com.espindola.lobwebapp.service.impl.base;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.exception.AlreadyExistsException;
import com.espindola.lobwebapp.exception.InvalidArgumentException;
import com.espindola.lobwebapp.exception.NotFoundException;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.repository.base.EntityRepository;
import com.espindola.lobwebapp.service.contract.base.EntityService;

public abstract class AbstractEntityServiceImpl<T extends AbstractEntity>
		implements EntityService<T> {

	private EntityRepository<T> repository;
	protected MessageKey entityMessageKey;

	@Autowired
	public AbstractEntityServiceImpl(EntityRepository<T> repository,
			MessageKey entityMessageKey) {
		this.repository = repository;
		this.entityMessageKey = entityMessageKey;
	}

	@Override
	public T find(Long id) throws NotFoundException {
		throwIfNotFound(id);
		return repository.findOne(id);
	}

	@Override
	public T save(T entity) throws AlreadyExistsException,
			InvalidArgumentException {
		throwIfInvalid(entity);
		throwIfAlreadyExists(entity);
		return repository.save(entity);
	}

	@Override
	public T update(T entity) throws NotFoundException,
			InvalidArgumentException {
		throwIfInvalid(entity);
		throwIfNotFound(entity.getId());
		return repository.save(entity);
	}

	@Override
	public T remove(Long id) throws NotFoundException {
		throwIfNotFound(id);
		T entity = repository.findOne(id);
		repository.delete(id);
		return entity;
	}

	@Override
	public boolean exists(Long id) {
		return repository.exists(id);
	}

	@Override
	public List<T> findAll() {
		return repository.findAll();
	}

	@Override
	public Page<T> findAll(Pageable p) {
		return repository.findAll(p);
	}

	protected void throwIfAlreadyExists(T entity) throws AlreadyExistsException {
		if (repository.exists(entity.getId()))
			throw new AlreadyExistsException(entityMessageKey, entity);
	}

	protected void throwIfNotFound(Long id) throws NotFoundException {
		if (!repository.exists(id))
			throw new NotFoundException(entityMessageKey, id);
	}

	protected abstract void throwIfInvalid(T entity)
			throws InvalidArgumentException;

}
