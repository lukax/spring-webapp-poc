package com.espindola.lobwebapp.domain;

import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.espindola.lobwebapp.domain.base.Person;

@Entity
@Table(name = "USER")
public class User extends Person {

	@NotNull
	@Size(min = 4)
	private String username;

	@NotNull
	@Size(min = 4)
	private String password;

	@NotNull
	@ElementCollection(targetClass = String.class)
	private List<String> roles;

	@NotNull
	private Boolean isLogged;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Boolean isLogged() {
		return isLogged;
	}

	public void setLogged(Boolean isLogged) {
		this.isLogged = isLogged;
	}

	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}
}
