package com.espindola.lobwebapp.domain;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.domain.util.OrderStatus;
import com.espindola.lobwebapp.domain.util.PaymentMode;

@Entity
@Table(name = "ORDERS")
public class Order extends AbstractEntity {

	@NotNull
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Customer customer;	
	
	@NotNull
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<Product> products = new HashSet<Product>();

	@NotNull
	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name="ORDER_STATUS", joinColumns = { @JoinColumn(name="ORDER_STATUS_ID") })
	private Set<OrderStatus> status = new HashSet<OrderStatus>();

	@NotNull
	private Date date;
	
	@Min(0)
	private Integer payment;
	
	private PaymentMode paymentMode;

	public Set<Product> getProducts() {
		return products;
	}

	public void setProducts(Set<Product> products) {
		this.products = products;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Integer getPayment() {
		return payment;
	}

	public void setPayment(Integer payment) {
		this.payment = payment;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Set<OrderStatus> getStatus() {
		return status;
	}

	public void setStatus(Set<OrderStatus> status) {
		this.status = status;
	}

	public PaymentMode getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(PaymentMode paymentMode) {
		this.paymentMode = paymentMode;
	}
}

