package com.espindola.lobwebapp.domain;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.espindola.lobwebapp.domain.base.Person;

@Entity
@Table(name = "TB_CUSTOMER")
public class Customer extends Person {

}
