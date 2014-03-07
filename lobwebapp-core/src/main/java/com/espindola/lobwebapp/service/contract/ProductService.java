package com.espindola.lobwebapp.service.contract;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.exception.NotFoundException;
import com.espindola.lobwebapp.service.contract.base.EntityService;

public interface ProductService extends EntityService<Product> {
	
	Product findByName(String name) throws NotFoundException;
	
	Page<Product> findAllByNameLike(String name, Pageable pageable);

}
