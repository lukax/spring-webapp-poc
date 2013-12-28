package com.espindola.lobwebapp.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.espindola.lobwebapp.domain.base.AbstractEntity;

@Entity
@Table(name = "TB_PRODUCT", uniqueConstraints = {
		@UniqueConstraint(columnNames = "NAME")
	})
@JsonIgnoreProperties(value = {"image", "stocks"})
public class Product extends AbstractEntity {

	private String name;

	private String description;
	
	private Double costPrice;

	private Double price;

	private String category;

	private String ncm;
	
	@Lob
	private byte[] image;

	@Temporal(TemporalType.TIMESTAMP)
	private Date registerDate;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "product")
	private List<Stock> stocks;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getCostPrice() {
		return costPrice;
	}

	public void setCostPrice(Double costPrice) {
		this.costPrice = costPrice;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getNcm() {
		return ncm;
	}

	public void setNcm(String ncm) {
		this.ncm = ncm;
	}

	public Date getRegisterDate() {
		return registerDate;
	}

	public void setRegisterDate(Date registerDate) {
		this.registerDate = registerDate;
	}

	public List<Stock> getStocks() {
		return stocks;
	}

	public void setStocks(List<Stock> stocks) {
		this.stocks = stocks;
	}

	@Override
	public String toString() {
		return "[" + 
				getId() + ", " + 
				getName() + 
				"]";
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}
}