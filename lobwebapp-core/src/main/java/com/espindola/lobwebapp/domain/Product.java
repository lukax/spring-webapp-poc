package com.espindola.lobwebapp.domain;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.espindola.lobwebapp.domain.base.AbstractEntity;

@Entity
@Table(name = "DT_PRODUCT")
public class Product extends AbstractEntity {
	private String name;
	private Double price;
	private String description;

	//@Column(name = "PRODUCT_DESCRIPTION")
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	//@Column(name = "PRODUCT_PRICE")
	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	//@Column(name = "PRODUCT_NAME", nullable = false)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
