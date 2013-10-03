package com.espindola.lobwebapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.WebDataBinder;
//import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.espindola.lobwebapp.controller.base.EntityController;
import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.exception.EntityNotFoundException;
import com.espindola.lobwebapp.service.contract.ProductService;

@Controller
@RequestMapping(value="/product")
public class ProductController extends EntityController<Product> {
	
	private ProductService service;
	
	@Autowired
	public ProductController(ProductService service) {
		super(service);
		this.service = service;
	}
	
//	@InitBinder
//	public void initBinder(WebDataBinder binder){
//		//binder.setValidator(validator);
//	}
	
	@Secured("ROLE_USER")
	@RequestMapping(method = RequestMethod.GET, headers = {"findByName"})
	@ResponseBody
	public List<Product> find(String name) throws EntityNotFoundException {
		return this.service.find(name);
	}
	
}
