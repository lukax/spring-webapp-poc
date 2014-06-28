package com.espindola.lobwebapp.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.espindola.lobwebapp.domain.FileMeta;
import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.exception.NotFoundException;
import com.espindola.lobwebapp.facade.base.AbstractEntityFacade;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.service.contract.ProductService;

@Transactional
@Component
public class ProductFacade extends AbstractEntityFacade<Product> {

	private ProductService productService;

	public ProductFacade() {
		super(null);
	}

	@Autowired
	public ProductFacade(ProductService productService) {
		super(productService);
		this.productService = productService;
	}

	public Page<Product> findAllByNameLike(String name, Pageable pageable) {
		return productService.findAllByNameLike(name, pageable);
	}

	public FileMeta getImage(Long id) {
		if(productService.exists(id)){
			Product product = productService.find(id);
			if (product.getImage() != null && product.getImage().getFileName() != null) {
				//Check file name so lazy object is initialized
				return product.getImage();
			}
		}
		throw new NotFoundException(MessageKey.IMAGE, id);
	}
}
