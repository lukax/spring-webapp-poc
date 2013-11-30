package com.espindola.lobwebapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.espindola.lobwebapp.controller.base.AbstractEntityController;
import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.service.contract.ProductService;

@Controller
@RequestMapping(value="/product")
public class ProductController extends AbstractEntityController<Product> {
	
	private ProductService service;
	
	@Autowired
	public ProductController(ProductService service) {
		super(service);
		this.service = service;
	}
	
	@RequestMapping(method = RequestMethod.GET, params = {"page", "size"}, headers = {"product_name"})
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public ResponseEntity<List<Product>> findByNameLike(@RequestHeader("product_name") String productName, @RequestParam("page") Integer page, @RequestParam("size") Integer size) {
		Page<Product> products = this.service.findByNameLike(productName, new PageRequest(page, size));
		HttpHeaders headers = new HttpHeaders();
		headers.add("pages_total", ""+products.getTotalPages());
		return new ResponseEntity<List<Product>>(products.getContent(), headers, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/category", method = RequestMethod.GET)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public List<String> findAllCategory(){
		return this.service.findAllCategory();
	}
}
