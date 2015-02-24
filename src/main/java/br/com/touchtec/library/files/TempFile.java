package br.com.touchtec.library.files;

import java.io.Serializable;

/**
 * @author bbviana
 */
public class TempFile implements Serializable {

    private byte[] bytes;

    private String fileName;

    public TempFile(byte[] bytes, String fileName) {
        this.bytes = bytes;
        this.fileName = fileName;
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
}
