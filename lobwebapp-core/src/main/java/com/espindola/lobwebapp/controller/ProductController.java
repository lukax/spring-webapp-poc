package com.espindola.lobwebapp.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.espindola.lobwebapp.controller.base.AbstractEntityController;
import com.espindola.lobwebapp.controller.util.HeaderKey;
import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.event.PageReturnEvent;
import com.espindola.lobwebapp.exception.invalidArgument.InvalidArgumentException;
import com.espindola.lobwebapp.exception.notFound.NotFoundException;
import com.espindola.lobwebapp.service.contract.ProductService;
import com.espindola.lobwebapp.validation.ProductValidator;

@Controller
@RequestMapping(value="/product")
public class ProductController extends AbstractEntityController<Product> {
	
	private ProductService productService;
	private ProductValidator validator;
	
	@Autowired
	public ProductController(ProductService service, ProductValidator validator) {
		super(service);
		this.productService = service;
		this.validator = validator;
	}
	
	@InitBinder
	protected void initBinder(WebDataBinder dataBinder){
		dataBinder.setValidator(validator);
	}
	
	@RequestMapping(method = RequestMethod.GET, headers = {HeaderKey.PRODUCT_NAME})
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public List<Product> findByNameLike(HttpServletResponse response, @RequestHeader(HeaderKey.PRODUCT_NAME) String productName, @RequestHeader(HeaderKey.PAGE_INDEX) Integer pageIndex, @RequestHeader(HeaderKey.PAGE_SIZE) Integer pageSize) {
		Page<Product> products = this.productService.findByNameLike(productName, new PageRequest(pageIndex, pageSize));
		super.eventPublisher.publishEvent(new PageReturnEvent(products, response));
		return products.getContent();
	}
	
	@RequestMapping(value = "/category", method = RequestMethod.GET)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public List<String> findAllCategory(){
		return this.productService.findAllCategory();
	}
	
	@RequestMapping(value = "/{productId:[\\d]+}/stock", method = RequestMethod.GET)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public List<Stock> getStock(@PathVariable("productId") Long productId) throws InvalidArgumentException, NotFoundException {
		return super.find(productId).getStocks();
	}
}
