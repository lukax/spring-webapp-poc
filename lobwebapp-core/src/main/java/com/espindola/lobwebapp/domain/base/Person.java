package com.espindola.lobwebapp.domain.base;

import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class Person extends AbstractEntity {

	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
