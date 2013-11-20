package com.espindola.lobwebapp.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.espindola.lobwebapp.domain.base.AbstractEntity;

@Entity
@Table(name = "PRODUCT")
public class Product extends AbstractEntity {

	@NotNull
	@Size(min = 3)
	private String name;

	@NotNull
	private String description;

	@Min(0)
	private Integer quantity;

	@Min(0)
	private Double costPrice;

	@Min(0)
	private Double price;

	@Column(name = "CATEGORY")
	private String category;

	private String ncm;

	private Date date;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getNcm() {
		return ncm;
	}

	public void setNcm(String ncm) {
		this.ncm = ncm;
	}

	public String getGroup() {
		return getCategory();
	}

	public void setGroup(String group) {
		this.setCategory(group);
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Double getCostPrice() {
		return costPrice;
	}

	public void setCostPrice(Double costPrice) {
		this.costPrice = costPrice;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

}
