package com.espindola.lobwebapp.domain;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.espindola.lobwebapp.domain.base.AbstractEntity;

@Entity
@Table(name = "ORDERS")
public class Order extends AbstractEntity {

	@NotNull
	@ManyToOne(fetch = FetchType.EAGER)
	private Customer customer;	
	
	@NotNull
	@OneToMany(fetch = FetchType.EAGER)
	private Set<Product> products = new HashSet<Product>();

	@NotNull
	private Date date;
	
	@NotNull
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Payment payment;

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

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

	public Payment getPayment() {
		return payment;
	}

	public void setPayment(Payment payment) {
		this.payment = payment;
	}


}

