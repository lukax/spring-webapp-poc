package com.espindola.lobwebapp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.exception.AlreadyExistsException;
import com.espindola.lobwebapp.exception.InvalidArgumentException;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.repository.StockRepository;
import com.espindola.lobwebapp.service.contract.StockService;
import com.espindola.lobwebapp.service.impl.base.AbstractEntityServiceImpl;

@Service
public class StockServiceImpl extends AbstractEntityServiceImpl<Stock>
		implements StockService {

	private StockRepository repository;

	@Autowired
	public StockServiceImpl(StockRepository repository) {
		super(repository, MessageKey.STOCK);
		this.repository = repository;
	}

	@Override
	public Stock findByProductId(Long productId) {
		return this.repository.findByProductId(productId);
	}

	@Override
	protected void throwIfInvalid(Stock entity) throws InvalidArgumentException {
		// TODO: Business logic
	}

	@Override
	protected void throwIfAlreadyExists(Stock entity)
			throws AlreadyExistsException {
		super.throwIfAlreadyExists(entity);
		if (repository.findByProductId(entity.getProduct().getId()) != null)
			throw new AlreadyExistsException(MessageKey.STOCK, entity);
	}

}