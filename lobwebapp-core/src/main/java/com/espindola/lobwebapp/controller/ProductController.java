package com.espindola.lobwebapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
	
	@RequestMapping(value="/test", method = RequestMethod.GET)
	@ResponseBody
	public String testItOut(){
		return "It Works!";
	}
}
