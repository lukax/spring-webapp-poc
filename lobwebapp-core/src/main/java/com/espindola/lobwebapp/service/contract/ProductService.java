package com.espindola.lobwebapp.service.contract;

import java.util.List;

import com.espindola.lobwebapp.domain.Product;

public interface ProductService extends EntityService<Product> {
	List<Product> find(String name);
}
