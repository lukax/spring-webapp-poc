package com.espindola.lobwebapp.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.common.exceptions.InvalidRequestException;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.espindola.lobwebapp.controller.base.AbstractEntityController;
import com.espindola.lobwebapp.controller.util.HeaderKey;
import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.event.PageReturnEvent;
import com.espindola.lobwebapp.exception.invalidArgument.InvalidArgumentException;
import com.espindola.lobwebapp.exception.invalidArgument.ProductInvalidException;
import com.espindola.lobwebapp.exception.notFound.NotFoundException;
import com.espindola.lobwebapp.exception.util.EntityError;
import com.espindola.lobwebapp.facade.ProductFacade;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.validation.ProductValidator;

@Controller
@RequestMapping(value="/product")
public class ProductController extends AbstractEntityController<Product> {
	
	@Autowired
	private ServletContext context;
	private ProductFacade facade;
	
	@Autowired
	public ProductController(ProductFacade facade, ProductValidator validator) {
		super(facade, validator);
		this.facade = facade;
	}
	
	@RequestMapping(method = RequestMethod.GET, headers = {HeaderKey.PRODUCT_NAME})
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public List<Product> findByNameLike(HttpServletResponse response, @RequestHeader(HeaderKey.PRODUCT_NAME) String productName, @RequestHeader(HeaderKey.PAGE_INDEX) Integer pageIndex, @RequestHeader(HeaderKey.PAGE_SIZE) Integer pageSize) {
		Page<Product> products = this.facade.findByNameLike(productName, new PageRequest(pageIndex, pageSize));
		super.eventPublisher.publishEvent(new PageReturnEvent(products, response));
		return products.getContent();
	}
	
	@RequestMapping(value = "/category", method = RequestMethod.GET)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public List<String> findAllCategory(){
		return this.facade.findAllCategory();
	}
	
	@RequestMapping(value = "/{productId:[\\d]+}/stock", method = RequestMethod.GET)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public List<Stock> getStock(@PathVariable("productId") Long productId) throws InvalidArgumentException, NotFoundException {
		return super.find(productId).getStocks();
	}
	
	@RequestMapping(value = "/{productId:[\\d]+}/image", method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.OK)
	public void uploadImage(@PathVariable("productId") Long productId, UriComponentsBuilder ucb, HttpServletRequest request, HttpServletResponse response) throws InvalidArgumentException, NotFoundException {
		if(!ServletFileUpload.isMultipartContent(request)) 
			throw new InvalidRequestException("request for this url should be multipart");
		// Create a factory for disk-based file items
		DiskFileItemFactory factory = new DiskFileItemFactory();
		// Configure a repository (to ensure a secure temp location is used)
		File repository = (File) context.getAttribute("javax.servlet.context.tempdir");
		factory.setRepository(repository);
		// Create a new file upload handler
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setSizeMax(5100000);
		try {
			// Parse the request
			List<FileItem> items = upload.parseRequest(request);
			for(FileItem x : items){
				if(!x.isFormField()){
					Product product = facade.find(productId);
					product.setImage(x.get());
					facade.update(product);
					//Set Location header
					UriComponents build = ucb.path(request.getPathInfo()).buildAndExpand(product.getId());
					response.setHeader("Location", build.toUriString());
					break;
				}
			}
		} catch (FileUploadException e) {	
			throw new ProductInvalidException(new EntityError(MessageKey.PRODUCTIMAGETOOBIG_VALIDATION, new Object[] { "5 MB"}));
		}
	}
	
	@RequestMapping(value = "/{productId:[\\d]+}/image", method = RequestMethod.GET)
	@ResponseStatus(value = HttpStatus.OK)
	public void showImage(@PathVariable("productId") Long productId, HttpServletResponse response) throws InvalidArgumentException, NotFoundException {
		Product product = facade.find(productId);
		try {
			response.getOutputStream().write(product.getImage());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	protected void validationResult(BindingResult bindingResult) throws InvalidArgumentException {
		if(bindingResult.hasErrors())
			throw new ProductInvalidException(bindingResult.getAllErrors());
	}
}
