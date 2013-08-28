package com.espindola.lobwebapp.repository.contract;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.repository.contract.base.EntityRepository;

@Repository
public interface ProductRepository extends EntityRepository<Product> {
	//JPA automatically creates implementation for this
	public List<Product> findByName(String name);
}
