package com.espindola.lobwebapp.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.repository.contract.StockRepository;
import com.espindola.lobwebapp.service.contract.StockService;
import com.espindola.lobwebapp.service.impl.base.AbstractEntityServiceImpl;

@Service
@Transactional
public class StockServiceImpl extends AbstractEntityServiceImpl<Stock> implements StockService {

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
}
