package com.espindola.lobwebapp.domain;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URLConnection;

import javax.persistence.Entity;
import javax.persistence.Lob;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.springframework.web.multipart.MultipartFile;

import com.espindola.lobwebapp.domain.base.AbstractEntity;

@Entity
public class FileMeta extends AbstractEntity {

	private String fileName;

	private Long fileSize;

	private String fileType;

	@JsonIgnore
	@Lob
	private byte[] bytes;

	public FileMeta() {

	}

	public FileMeta(MultipartFile multipartFile) throws IOException {
		setId(0L);
		setFileName(multipartFile.getName());
		setFileSize(multipartFile.getSize());
		setBytes(multipartFile.getBytes());
		setFileType(multipartFile.getContentType());

		if (getFileType() == null) {
			try {
				String fileType = URLConnection
						.guessContentTypeFromStream(new ByteArrayInputStream(
								getBytes()));
				setFileType(fileType);
			} catch (IOException ex) {

			}
		}
	}

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
}