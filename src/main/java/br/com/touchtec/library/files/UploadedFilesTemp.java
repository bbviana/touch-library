package br.com.touchtec.library.files;

import com.google.common.io.ByteStreams;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;

import javax.enterprise.context.SessionScoped;
import java.io.InputStream;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * @author bbviana
 */
@SessionScoped
public class UploadedFilesTemp implements Serializable {

    private static final long serialVersionUID = 1L;

    private Map<String, TempFile> files = new HashMap<>();

    /**
     * @param hash
     * @return tempFile ou null; o tempFile permanece no repositório após a invocação o método.
     */
    public TempFile get(String hash) {
        return files.get(hash);
    }

    /**
     * @param hash
     * @return tempFile, removendo-o do repositório; null se não existir um file com o hash correspondente
     */
    public TempFile remove(String hash) {
        return files.remove(hash);
    }

    public void clear() {
        files.clear();
    }

    public String put(InputStream stream, FormDataContentDisposition details) {
        byte[] bytes;
        try {
            bytes = ByteStreams.toByteArray(stream);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        TempFile tempFile = new TempFile(bytes, details.getFileName());
        String sha1hash = SHA1Generator.generate(bytes);

        files.put(sha1hash, tempFile);

        System.out.println("TempFile adicionado. Hash: " + sha1hash);
        System.out.println("Total de arquvos: " + files.size());

        return sha1hash;
    }
}
