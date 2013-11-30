package com.espindola.lobwebapp.domain;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.espindola.lobwebapp.domain.base.AbstractEntity;

@Entity
@Table(name = "PAYMENTS")
public class Payment extends AbstractEntity {
	@NotNull
	@Min(0)
	private Double quantity;
	
	@NotNull
	private PaymentStatus status;
	
	@NotNull
	private PaymentMode mode;

	public Double getQuantity() {
		return quantity;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}

	public PaymentStatus getStatus() {
		return status;
	}

	public void setStatus(PaymentStatus status) {
		this.status = status;
	}

	public PaymentMode getMode() {
		return mode;
	}

	public void setMode(PaymentMode mode) {
		this.mode = mode;
	}

}
