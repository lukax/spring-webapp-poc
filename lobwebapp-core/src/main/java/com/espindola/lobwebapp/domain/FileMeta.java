package com.espindola.lobwebapp.domain;

import javax.persistence.Entity;
import javax.persistence.Lob;

import org.apache.commons.fileupload.FileItem;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.espindola.lobwebapp.domain.base.AbstractEntity;

@Entity
@JsonIgnoreProperties({"bytes"}) 
public class FileMeta extends AbstractEntity {
 
    private String fileName;
    
    private Long fileSize;
    
    private String fileType;
    
    @Lob
    private byte[] bytes;

	
    public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public Long getFileSize() {
		return fileSize;
	}

	public void setFileSize(Long l) {
		this.fileSize = l;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public byte[] getBytes() {
		return bytes;
	}

	public void setBytes(byte[] bytes) {
		this.bytes = bytes;
	}
	
	public static FileMeta from(FileItem fileItem){
		FileMeta fileMeta = new FileMeta();
		fileMeta.setId(0L);
		fileMeta.setFileName(fileItem.getName());
		fileMeta.setFileSize(fileItem.getSize());
		fileMeta.setFileType(fileItem.getContentType());
		fileMeta.setBytes(fileItem.get());
		return fileMeta;
	}
 
}