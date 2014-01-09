package com.espindola.lobwebapp.service.contract;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.exception.notFound.NotFoundException;
import com.espindola.lobwebapp.service.contract.base.EntityService;

public interface ProductService extends EntityService<Product> {
	Product findByName(String name) throws NotFoundException;
	Page<Product> findByNameLike(String name, Pageable pageable);
	List<String> findAllCategory();
	List<String> findCategoryByName(String name);
}
