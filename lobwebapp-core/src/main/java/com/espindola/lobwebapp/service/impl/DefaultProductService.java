package com.espindola.lobwebapp.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.repository.contract.ProductRepository;
import com.espindola.lobwebapp.service.contract.ProductService;
import com.espindola.lobwebapp.service.impl.base.AbstractEntityService;

@Service
public class DefaultProductService extends AbstractEntityService<Product>
		implements ProductService {

	private ProductRepository repository;

	@Autowired
	public DefaultProductService(ProductRepository repository) {
		super(repository);
		this.repository = repository;
	}

	@Override
	public List<Product> find(String name) {
		return repository.findByName(name);
	}

}
