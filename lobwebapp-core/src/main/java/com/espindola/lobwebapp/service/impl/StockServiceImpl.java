package com.espindola.lobwebapp.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.exception.alreadyExists.AlreadyExistsException;
import com.espindola.lobwebapp.exception.alreadyExists.StockExistsException;
import com.espindola.lobwebapp.exception.invalidArgument.InvalidArgumentException;
import com.espindola.lobwebapp.exception.notFound.NotFoundException;
import com.espindola.lobwebapp.exception.notFound.StockNotFoundException;
import com.espindola.lobwebapp.repository.StockRepository;
import com.espindola.lobwebapp.service.contract.StockService;
import com.espindola.lobwebapp.service.impl.base.AbstractEntityServiceImpl;

@Service
public class StockServiceImpl extends AbstractEntityServiceImpl<Stock>
		implements StockService {

	private StockRepository repository;

	@Autowired
	public StockServiceImpl(StockRepository repository) {
		super(repository);
		this.repository = repository;
	}

	@Override
	public List<Stock> findByProductId(Long productId) {
		return this.repository.findByProductId(productId);
	}

	@Override
	protected void throwIfInvalid(Stock entity) throws InvalidArgumentException {
		// TODO: Business logic
	}

	@Override
	protected void throwIfAlreadyExists(Stock entity)
			throws AlreadyExistsException {
		if (repository.exists(entity.getId()))
			throw new StockExistsException(entity);
	}

	@Override
	protected void throwIfNotFound(Long id) throws NotFoundException {
		if (!repository.exists(id))
			throw new StockNotFoundException(id);
	}
}