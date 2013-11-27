package com.espindola.lobwebapp.domain;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Min;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.domain.util.PaymentMode;
import com.espindola.lobwebapp.domain.util.PaymentStatus;

@Entity
@Table(name = "PAYMENTS")
public class Payment extends AbstractEntity {
	@Min(0)
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
