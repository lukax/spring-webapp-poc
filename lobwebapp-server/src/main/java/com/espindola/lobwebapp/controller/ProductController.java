package com.espindola.lobwebapp.controller;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.espindola.lobwebapp.controller.request.RequestKey;
import com.espindola.lobwebapp.domain.FileMeta;
import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.exception.InvalidArgumentException;
import com.espindola.lobwebapp.exception.NotFoundException;
import com.espindola.lobwebapp.facade.ProductFacade;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.validation.CustomObjectError;
import com.espindola.lobwebapp.validation.ErrorCode;
import com.espindola.lobwebapp.validation.validator.ProductValidator;

@Controller
@RequestMapping(value = "/product")
public class ProductController extends AbstractEntityController<Product> {

	@Autowired
	private ServletContext context;
	private ProductFacade facade;

	@Autowired
	public ProductController(ProductFacade facade, ProductValidator validator) {
		super(facade, validator, MessageKey.PRODUCT);
		this.facade = facade;
	}

	@RequestMapping(method = RequestMethod.GET, params = { RequestKey.PRODUCT_NAME }, headers = {
			RequestKey.PAGE_INDEX, RequestKey.PAGE_SIZE })
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public List<Product> findAllByNameLike(HttpServletResponse response,
			@RequestParam(RequestKey.PRODUCT_NAME) String productName,
			@RequestHeader(RequestKey.PAGE_INDEX) Integer pageIndex,
			@RequestHeader(RequestKey.PAGE_SIZE) Integer pageSize) {
		Page<Product> products = this.facade.findAllByNameLike(productName,
				new PageRequest(pageIndex, pageSize));
		response.addHeader(RequestKey.PAGE_TOTAL, "" + products.getTotalPages());
		return products.getContent();
	}

	@RequestMapping(value = "/{productId:[\\d]+}/image", method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public FileMeta uploadImage(@PathVariable("productId") Long productId,
			UriComponentsBuilder ucb, MultipartHttpServletRequest request,
			HttpServletResponse response) throws InvalidArgumentException,
			NotFoundException {
		Collection<MultipartFile> files = request.getFileMap().values();
		if (files.isEmpty())
			throw new InvalidArgumentException(MessageKey.PRODUCT,
					new CustomObjectError(ErrorCode.REQUIRED,
							MessageKey.VALIDATION_REQUIRED, "image"));

		try {
			FileMeta fileMeta = new FileMeta(files.iterator().next());

			Product product = facade.find(productId);
			product.setImage(fileMeta);
			product = facade.update(product);

			// Set Location header
			UriComponents build = ucb.path(request.getPathInfo())
					.buildAndExpand(product.getId());
			response.setHeader("Location", build.toUriString());

			return product.getImage();
		} catch (IOException e) {
			throw new InvalidArgumentException(MessageKey.PRODUCT,
					new CustomObjectError(ErrorCode.REQUIRED,
							MessageKey.VALIDATION_INVALIDFORMAT, "image"));
		}
	}

	@RequestMapping(value = "/{productId:[\\d]+}/image", method = RequestMethod.GET)
	@ResponseStatus(value = HttpStatus.OK)
	public void downloadImage(@PathVariable("productId") Long productId,
			HttpServletResponse response) throws InvalidArgumentException,
			NotFoundException, IOException {
		FileMeta fileMeta = facade.getImage(productId);
		response.getOutputStream().write(fileMeta.getBytes());
	}

}
