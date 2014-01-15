package com.espindola.lobwebapp.domain;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.espindola.lobwebapp.domain.base.AbstractEntity;

@Entity
@Table(name = "TB_PAYMENT")
public class Payment extends AbstractEntity {

	private Double quantity;

	private PaymentStatus status;

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
