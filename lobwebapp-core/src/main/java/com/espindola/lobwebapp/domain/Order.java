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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.espindola.lobwebapp.domain.base.AbstractEntity;

@Entity
@Table(name = "TB_ORDER")
public class Order extends AbstractEntity {

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "CUSTOMER_ID")
	private Customer customer;

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "TB_ORDER_ITEM", joinColumns = @JoinColumn(name = "ORDER_ID"))
	private Set<OrderItem> items = new HashSet<OrderItem>();

	@Temporal(TemporalType.TIMESTAMP)
	private Date date;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "PAYMENT_ID")
	private Payment payment;

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
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

	public Set<OrderItem> getItems() {
		return items;
	}

	public void setItems(Set<OrderItem> items) {
		this.items = items;
	}

	public Double computeTotalPrice() {
		Double qt = 0D;
		try {
			for (OrderItem i : getItems()) {
				qt += i.computeTotalPrice();
			}
		} catch (NullPointerException ex) {
		}

		return qt;
	}
}
