package com.espindola.lobwebapp.domain;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.espindola.lobwebapp.domain.base.Person;

@Entity
@Table(name = "TB_USER", uniqueConstraints = { @UniqueConstraint(columnNames = "USERNAME") })
public class User extends Person {

	private String username;

	private String password;

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "TB_USER_ROLE", joinColumns = @JoinColumn(name = "USER_ID"))
	private Set<String> roles = new HashSet<String>();

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

	public Set<String> getRoles() {
		return roles;
	}

	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}

}
