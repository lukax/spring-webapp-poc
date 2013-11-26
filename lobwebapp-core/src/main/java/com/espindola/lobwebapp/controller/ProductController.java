package com.espindola.lobwebapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.espindola.lobwebapp.controller.base.AbstractEntityController;
import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.exception.EntityNotFoundException;
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
	
	@RequestMapping(method = RequestMethod.GET, value = "/{name}", headers = {"findByName"})
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public List<Product> find(@PathVariable("name") String name) throws EntityNotFoundException {
		return this.service.findByName(name);
	}
	
	@RequestMapping(method = RequestMethod.GET, headers = {"listCategory"})
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public List<String> listCategory(){
		return this.service.listCategory();
	}
}
