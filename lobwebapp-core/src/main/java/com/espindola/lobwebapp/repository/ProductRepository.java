package com.espindola.lobwebapp.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.repository.base.EntityRepository;

@Repository
public interface ProductRepository extends EntityRepository<Product> {

	public Product findByName(String name);

	public List<Product> findByNameLike(String name);

	public Page<Product> findByNameLike(String name, Pageable pageable);

}
