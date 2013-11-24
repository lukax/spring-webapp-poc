package com.espindola.lobwebapp.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.domain.util.OrderStatus;

@Entity
@Table(name = "ORDER")
public class Order extends AbstractEntity {

	@NotNull
	@OneToMany(targetEntity = Product.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "ORDER_PRODUCT", joinColumns = { @JoinColumn(name = "ORDER_ID") }, inverseJoinColumns = { @JoinColumn(name = "PRODUCT_ID") })
	private List<Product> products;

	@NotNull
	private OrderStatus status;

	@NotNull
	private String date;

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

}
