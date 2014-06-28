package com.espindola.lobwebapp.domain.base;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class AbstractEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	public long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public int hashCode() {
		return (int) this.getId();
	}

	@Override
	public boolean equals(Object obj) {
		if (obj instanceof AbstractEntity) {
			AbstractEntity entity = (AbstractEntity) obj;
			return entity.getId() == this.getId();
		}
		return false;
	}
}
