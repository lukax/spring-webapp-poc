package com.espindola.lobwebapp.domain;

import java.math.BigDecimal;

import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public class OrderItem {

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "PRODUCT_ID")
	private Product product;

	private Integer quantity;

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public BigDecimal computeTotalPrice() {
		BigDecimal qt = new BigDecimal(0);
		try {
			qt = product.getPrice().multiply(new BigDecimal(quantity));
		} catch (NullPointerException ex) {
		}
		return qt;
	}
}
