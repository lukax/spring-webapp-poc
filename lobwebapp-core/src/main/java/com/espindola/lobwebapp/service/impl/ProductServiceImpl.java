package com.espindola.lobwebapp.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
	public List<String> findAllCategory() {
		return this.repository.findAllCategory();
	}
	
	@Override
	public List<String> findCategoryByName(String name) {
		String compareName = name.toLowerCase();
		List<String> current = this.repository.findAllCategory();
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
		return this.repository.findByNameLike(name, pageable);
	}
	
}
