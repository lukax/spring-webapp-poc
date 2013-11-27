package com.espindola.lobwebapp.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.exception.EntityNotFoundException;
import com.espindola.lobwebapp.repository.contract.ProductRepository;
import com.espindola.lobwebapp.service.contract.ProductService;
import com.espindola.lobwebapp.service.impl.base.AbstractEntityServiceImpl;

@Service
public class ProductServiceImpl extends AbstractEntityServiceImpl<Product> implements ProductService {

	private ProductRepository repository;

	@Autowired
	public ProductServiceImpl(ProductRepository repository) {
		super(repository);
		this.repository = repository;
	}

	@Override
	public List<Product> findByName(String name) throws EntityNotFoundException {
		return this.repository.findByName(name);
	}

	@Override
	public List<String> listCategory() {
		return this.repository.listCategory();
	}
	
}