package com.espindola.lobwebapp.domain.base;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@MappedSuperclass
public abstract class AbstractEntity {

	@Id
	@GeneratedValue
	@NotNull
	@Min(0)
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	@Override
	public int hashCode() {
		return this.getId().intValue();
	}
	
	@Override
	public boolean equals(Object obj) {
		if(obj instanceof AbstractEntity){
			AbstractEntity entity = (AbstractEntity)obj;
			return entity.getId() == this.getId();
		}
		return false;
	}
}
