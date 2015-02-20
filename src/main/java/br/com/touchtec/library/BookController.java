package br.com.touchtec.library;

import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSInputFile;
import org.bson.types.ObjectId;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import java.io.InputStream;
import java.net.UnknownHostException;
import java.util.List;

import static javax.ws.rs.core.MediaType.*;

/**
 * @author bbviana
 */
@Path("books")
@ApplicationScoped
@Produces(APPLICATION_JSON)
public class BookController {

    @Inject
    private BookDAO bookDAO;

    @POST
    @Consumes(APPLICATION_JSON)
    public void save(Book book) {
        bookDAO.insert(book);
    }

    @GET
    @Path("{id}")
    public Book get(@PathParam("id") String id) {
        try {
            Thread.sleep(300);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        return bookDAO.findById(id);
    }

    @GET
    public List<Book> list() {
        return bookDAO.list();
    }

    @POST
    @Path("/upload")
    @Consumes(MULTIPART_FORM_DATA)
    public Response uploadFile(
            @FormDataParam("file") InputStream uploadedInputStream,
            @FormDataParam("file") FormDataContentDisposition fileDetail) {

        DB db = db();

        GridFS gridFS = new GridFS(db, "images");
        GridFSInputFile gfsFile = gridFS.createFile(uploadedInputStream, true);
        gfsFile.setFilename(fileDetail.getFileName());
        gfsFile.save();

        System.out.println("Arquivo salvo no banco de dados");

        return Response.status(200).build();
    }

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
        GridFS gridFS = new GridFS(db, "images");
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
