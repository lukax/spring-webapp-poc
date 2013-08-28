package com.espindola.lobwebapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.WebDataBinder;
//import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;

import com.espindola.lobwebapp.controller.base.EntityController;
import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.service.contract.ProductService;

@Controller
@RequestMapping(value="/product")
public class ProductController extends EntityController<Product> {

	@Autowired
	public ProductController(ProductService service) {
		super(service);
	}
	
//	@InitBinder
//	public void initBinder(WebDataBinder binder){
//		//binder.setValidator(validator);
//	}
	
}
