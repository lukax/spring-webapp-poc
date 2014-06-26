package com.espindola.lobwebapp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.espindola.lobwebapp.domain.FileMeta;
import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.exception.AlreadyExistsException;
import com.espindola.lobwebapp.exception.InvalidArgumentException;
import com.espindola.lobwebapp.exception.NotFoundException;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.repository.ProductRepository;
import com.espindola.lobwebapp.service.contract.ProductService;
import com.espindola.lobwebapp.service.impl.base.AbstractEntityServiceImpl;
import com.espindola.lobwebapp.validation.util.CustomObjectError;
import com.espindola.lobwebapp.validation.util.ErrorCode;

@Service
public class ProductServiceImpl extends AbstractEntityServiceImpl<Product>
		implements ProductService {

	private MessageKey entityMessageKey = MessageKey.PRODUCT;

	private ProductRepository repository;

	@Autowired
	public ProductServiceImpl(ProductRepository repository) {
		super(repository, MessageKey.PRODUCT);
		this.repository = repository;
	}

	@Override
	public Product findByName(String name) throws NotFoundException {
		return repository.findByName(name);
	}

	@Override
	public Page<Product> findAllByNameLike(String name, Pageable pageable) {
		return repository.findAllByNameLike(name, pageable);
	}

	@Override
	protected void throwIfInvalid(Product entity)
			throws InvalidArgumentException {
		// TODO: Business logic
		throwIfPriceIsLessThanCostPrice(entity);
		throwIfInvalidOrTooBigImage(entity);
	}

	@Override
	protected void throwIfAlreadyExists(Product entity)
			throws AlreadyExistsException {
		Product p = repository.findOne(entity.getId());
		if (p != null)
			throw new AlreadyExistsException(entityMessageKey, p);

		Product q = repository.findByName(entity.getName());
		if (q != null)
			throw new AlreadyExistsException(entityMessageKey, q);
	}

	private void throwIfPriceIsLessThanCostPrice(Product entity) {
		if (entity.getCostPrice() != null) {
			int costPriceComparison = entity.getCostPrice().compareTo(
					entity.getPrice());

			ErrorCode errorCode = ErrorCode.REQUIRED;
			if (costPriceComparison == 0)
				errorCode = ErrorCode.REQUIRED;
			else if (costPriceComparison > 0)
				errorCode = ErrorCode.INVALID;
			else
				return;

			throw new InvalidArgumentException(entityMessageKey,
					new CustomObjectError(errorCode,
							MessageKey.VALIDATION_INVALID, "costPrice"));
		}
	}

	private void throwIfInvalidOrTooBigImage(Product entity) {
		if (entity.getImage() != null) {
			FileMeta image = entity.getImage();

			ErrorCode errorCode = ErrorCode.REQUIRED;
			if (image.getFileType() == null
					|| !image.getFileType().contains("image"))
				errorCode = ErrorCode.REQUIRED;
			else if (image.getBytes() == null
					|| image.getBytes().length > 5100000)
				errorCode = ErrorCode.INVALID;
			else
				return;

			throw new InvalidArgumentException(entityMessageKey,
					new CustomObjectError(errorCode,
							MessageKey.VALIDATION_INVALID, "image", "5 MB"));
		}
	}
}