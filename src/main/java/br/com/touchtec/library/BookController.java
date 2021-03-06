package br.com.touchtec.library;

import br.com.touchtec.library.files.TempFile;
import br.com.touchtec.library.files.UploadedFilesTemp;
import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSDBFile;
import org.bson.types.ObjectId;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import java.io.InputStream;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static javax.ws.rs.core.MediaType.*;

/**
 * @author bbviana
 */
@Path("books")
@RequestScoped
@Produces(APPLICATION_JSON)
public class BookController {

    @Inject
    private BookDAO bookDAO;

    @Inject
    private UploadedFilesTemp filesTemp;

    @POST
    @Consumes(APPLICATION_JSON)
    public Book save(Book book) {
        Sleeper.sleep(500);

        // hash -> TempFile
        Map<String, TempFile> files = new HashMap<>();
        files.put(book.getCoverId(), filesTemp.remove(book.getCoverId()));
        files.put(book.getPdfId(), filesTemp.remove(book.getPdfId()));
        files.put(book.getEpubId(), filesTemp.remove(book.getEpubId()));
        files.put(book.getMobiId(), filesTemp.remove(book.getMobiId()));

        filesTemp.clear();

        return bookDAO.insert(book, files);
    }

    @GET
    @Path("{id}")
    public Book get(@PathParam("id") String id) {
        Sleeper.sleep(500);
        return bookDAO.findById(id);
    }

    @GET
    public List<Book> list() {
        Sleeper.sleep(500);
        return bookDAO.list();
    }

    @POST
    @Path("/upload")
    @Consumes(MULTIPART_FORM_DATA)
    public Response uploadFile(
            @FormDataParam("file") InputStream uploadedInputStream,
            @FormDataParam("file") FormDataContentDisposition fileDetail) {

        String hash = filesTemp.put(uploadedInputStream, fileDetail);
        return Response.status(200).entity(hash).build();
    }

    // TODO cache
    @GET
    @Path("/image/{id}")
    @Produces("image/jpg")
    public InputStream image(@PathParam("id") String id) {
        DB db = db();
        GridFS gridFS = new GridFS(db, "images");
        GridFSDBFile gfsFile = gridFS.findOne(new ObjectId(id));

        return gfsFile.getInputStream();
    }

    @GET
    @Path("/download/{id}")
    @Produces(APPLICATION_OCTET_STREAM)
    public Response download(@PathParam("id") String id) {
        DB db = db();
        GridFS gridFS = new GridFS(db, "digital");
        GridFSDBFile gfsFile = gridFS.findOne(new ObjectId(id));

        ResponseBuilder rb = Response
                .ok(gfsFile.getInputStream())
                .header("Content-Disposition", "attachment; filename=" + gfsFile.getFilename());

        return rb.build();
    }

    private static DB db() {
        try {
            MongoClient client = new MongoClient("localhost", 27017);
            return client.getDB("touch-library");
        } catch (UnknownHostException e) {
            throw new RuntimeException(e);
        }
    }
}
