package com.espindola.lobwebapp.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.espindola.lobwebapp.domain.base.Person;

@Entity
@Table(name = "USERS")
public class User extends Person {

	@Column(unique = true)
	@NotNull
	@Size(min = 4)
	private String username;

	@NotNull
	@Size(min = 4)
	private String password;

	@NotNull
	@ElementCollection(fetch = FetchType.EAGER)
	private List<String> roles = new ArrayList<String>();

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}
}
