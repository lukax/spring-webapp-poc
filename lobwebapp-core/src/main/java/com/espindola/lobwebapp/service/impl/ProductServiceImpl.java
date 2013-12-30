package com.espindola.lobwebapp.service.impl;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.exception.alreadyExists.AlreadyExistsException;
import com.espindola.lobwebapp.exception.alreadyExists.ProductExistsException;
import com.espindola.lobwebapp.exception.invalidArgument.InvalidArgumentException;
import com.espindola.lobwebapp.exception.invalidArgument.ProductInvalidException;
import com.espindola.lobwebapp.exception.notFound.NotFoundException;
import com.espindola.lobwebapp.exception.notFound.ProductNotFoundException;
import com.espindola.lobwebapp.exception.util.EntityError;
import com.espindola.lobwebapp.l10n.MessageKey;
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
	public Product findByName(String name) throws NotFoundException {
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
		throwIfInvalidImage(entity);
	}
	
	@Override
	protected void throwIfAlreadyExists(Product entity) throws AlreadyExistsException {
		Product p = repository.findOne(entity.getId());
		if(p != null)
			throw new ProductExistsException(p);
		
		Product q = repository.findByName(entity.getName());
		if(q != null)
			throw new ProductExistsException(q);
	}

	@Override
	protected void throwIfNotFound(Long id) throws NotFoundException {
		if(!repository.exists(id))
			throw new ProductNotFoundException(id);
	}
	
	private void throwIfInvalidImage(Product entity) {
		if(entity.getImage() != null && entity.getImage().getBytes() != null){
			try{
				String type = URLConnection.guessContentTypeFromStream(new ByteArrayInputStream(entity.getImage().getBytes()));
				if(type == null || !type.contains("image")){
					throw new ProductInvalidException(new EntityError(MessageKey.PRODUCTIMAGEINVALID_VALIDATION));
				}
				if(entity.getImage().getBytes().length > 5000000){
					throw new ProductInvalidException(new EntityError(MessageKey.PRODUCTIMAGETOOBIG_VALIDATION, new Object[] { "5 MB"}));
				}
			}catch(IOException ex){
				throw new ProductInvalidException(new EntityError(MessageKey.PRODUCTIMAGEINVALID_VALIDATION));
			}
		}
	}
}