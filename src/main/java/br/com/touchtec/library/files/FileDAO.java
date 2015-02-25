package br.com.touchtec.library.files;

import br.com.touchtec.library.files.TempFile;
import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSInputFile;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;

/**
 * @author bbviana
 */
@ApplicationScoped
public class FileDAO {

    private DB db;

    @PostConstruct
    void loadMongoDB() throws Exception {
        System.out.println("Carregando 'touch-library' database...");
        MongoClient client = new MongoClient("localhost", 27017);
        db = client.getDB("touch-library");
    }


    public String saveImage(TempFile tempFile) {
        if(tempFile == null){
            return null;
        }

        GridFS gridFS = new GridFS(db, "images");
        GridFSInputFile gfsFile = gridFS.createFile(tempFile.getBytes());
        gfsFile.setFilename(tempFile.getFileName());
        gfsFile.save();

        System.out.println("Arquivo de Imagem salvo no banco de dados");

        return gfsFile.getId().toString();
    }

    public String saveFile(TempFile tempFile) {
        if(tempFile == null){
            return null;
        }

        GridFS gridFS = new GridFS(db, "digital");
        GridFSInputFile gfsFile = gridFS.createFile(tempFile.getBytes());
        gfsFile.setFilename(tempFile.getFileName());
        gfsFile.save();

        System.out.println("Arquivo salvo no banco de dados");

        return gfsFile.getId().toString();
    }
}
