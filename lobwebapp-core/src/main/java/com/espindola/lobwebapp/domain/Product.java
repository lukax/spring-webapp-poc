package com.espindola.lobwebapp.domain;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.espindola.lobwebapp.domain.base.AbstractEntity;

@Entity
@Table(name = "PT_PRODUCT")
public class Product extends AbstractEntity {
	@NotNull
	@Size(min = 3)
	private String name;
	
	@Min(0)
	private Double price;
	
	@NotNull
	private String description;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
