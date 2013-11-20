package com.espindola.lobwebapp.repository.contract;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.repository.contract.base.EntityRepository;

@Repository
public interface ProductRepository extends EntityRepository<Product> {
	
	public List<Product> findByName(String name);
	
	@Query(value = "SELECT DISTINCT CATEGORY FROM PRODUCT", nativeQuery = true)
	public List<String> listCategory();
}
