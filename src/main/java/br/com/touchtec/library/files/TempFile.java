package br.com.touchtec.library.files;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;

/**
 * @author bbviana
 */
public class TempFile implements Serializable {

    private String id;

    private String hash;

    private String fileName;

    @JsonIgnore
    private byte[] bytes;

    public TempFile(byte[] bytes, String fileName) {
        this.bytes = bytes;
        this.fileName = fileName;
    }

    // <editor-fold desc="Getters e Setters">

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public byte[] getBytes() {
        return bytes;
    }

    public void setBytes(byte[] bytes) {
        this.bytes = bytes;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    // </editor-fold>
}
