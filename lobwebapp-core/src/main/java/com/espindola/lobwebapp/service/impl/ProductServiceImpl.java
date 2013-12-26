package com.espindola.lobwebapp.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.exception.alreadyExists.AlreadyExistsException;
import com.espindola.lobwebapp.exception.alreadyExists.ProductExistsException;
import com.espindola.lobwebapp.exception.invalidArgument.InvalidArgumentException;
import com.espindola.lobwebapp.exception.notFound.NotFoundException;
import com.espindola.lobwebapp.exception.notFound.ProductNotFoundException;
import com.espindola.lobwebapp.repository.contract.ProductRepository;
import com.espindola.lobwebapp.service.contract.ProductService;
import com.espindola.lobwebapp.service.impl.base.AbstractEntityServiceImpl;

@Service
@Transactional
public class ProductServiceImpl extends AbstractEntityServiceImpl<Product> implements ProductService {

	private ProductRepository repository;
	
	@Autowired
	public ProductServiceImpl(ProductRepository repository) {
		super(repository);
		this.repository = repository;
	}

	@Override
	public List<Product> findByName(String name) throws NotFoundException {
		return repository.findByName(name);
	}

	@Override
	public List<String> findAllCategory() {
		return repository.findAllCategory();
	}
	
	@Override
	public List<String> findCategoryByName(String name) {
		String compareName = name.toLowerCase();
		List<String> current = repository.findAllCategory();
		List<String> filtered = new ArrayList<String>();
		for(String x : current){
			if(x != null && x.toLowerCase().contains(compareName)){
				filtered.add(x);
			}
		}
		return filtered;
	}
	
	@Override
	public Page<Product> findByNameLike(String name, Pageable pageable) {
		return repository.findByNameLike(name, pageable);
	}


	@Override
	protected void throwIfInvalid(Product entity) throws InvalidArgumentException {
		//TODO: Business logic
	}
	
	@Override
	protected void throwIfAlreadyExists(Product entity) throws AlreadyExistsException {
		if(repository.exists(entity.getId()))
			throw new ProductExistsException(entity);
	}

	@Override
	protected void throwIfNotFound(Long id) throws NotFoundException {
		if(!repository.exists(id))
			throw new ProductNotFoundException(id);
	}
	
}