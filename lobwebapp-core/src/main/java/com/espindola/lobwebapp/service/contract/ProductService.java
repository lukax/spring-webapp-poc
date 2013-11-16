package com.espindola.lobwebapp.service.contract;

import java.util.List;

import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.exception.EntityNotFoundException;

public interface ProductService extends EntityService<Product> {
	List<Product> find(String name) throws EntityNotFoundException;
}
