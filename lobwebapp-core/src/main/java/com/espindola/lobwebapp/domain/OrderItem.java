package com.espindola.lobwebapp.domain;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class OrderItem {

	@Column(name = "PRODUCT_ID")
	private Long productId;
	
	private Integer quantity;

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}
	
	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
}
