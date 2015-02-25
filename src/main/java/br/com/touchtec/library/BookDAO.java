package br.com.touchtec.library;

import br.com.touchtec.library.files.FileDAO;
import br.com.touchtec.library.files.TempFile;
import com.mongodb.*;
import org.bson.types.ObjectId;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static java.lang.String.format;

/**
 * @author bbviana
 */
@ApplicationScoped
public class BookDAO {

    private DB db;

    @Inject
    private FileDAO fileDAO;

    @PostConstruct
    void loadMongoDB() throws Exception {
        System.out.println("Carregando 'touch-library' database...");
        MongoClient client = new MongoClient("localhost", 27017);
        db = client.getDB("touch-library");
    }


    public Book insert(Book book, Map<String, TempFile> files) {
        // TODO Como transacionar os comandos abaixo?

        String coverId = fileDAO.saveImage(files.get(book.getCoverId()));
        String pdfId = fileDAO.saveFile(files.get(book.getPdfId()));
        String epubId = fileDAO.saveFile(files.get(book.getEpubId()));
        String mobiId = fileDAO.saveFile(files.get(book.getMobiId()));

        BasicDBObject object = (BasicDBObject) BasicDBObjectBuilder.start()
                .append("title", book.getTitle())
                .append("category", book.getCategory())
                .append("author", book.getAuthor())
                .append("publisher", book.getPublisher())
                .append("datePublished", book.getDatePublished())
                .append("description", book.getDescription())
                .append("coverId", coverId)
                .append("pdfId", pdfId)
                .append("epubId", epubId)
                .append("mobiId", mobiId)
                .get();

        db.getCollection("books").insert(object);

        System.out.println(format("Livro %s salvo no banco.", book.getTitle()));

        return toBook(object);
    }

    public List<Book> list() {
        List<Book> books = new ArrayList<>();
        db.getCollection("books").find().forEach(object -> books.add(toBook((BasicDBObject) object)));
        return books;
    }

    public Book findById(String id) {
        DBObject object = db.getCollection("books").findOne(new ObjectId(id));
        return toBook((BasicDBObject) object);
    }

    private static DBObject toDBObject(Book book) {
        return null;
    }

    private static Book toBook(BasicDBObject object) {
        Book book = new Book();
        book.setId(object.getObjectId("_id").toString());
        book.setTitle(object.getString("title"));
        book.setCategory(object.getString("category"));
        book.setAuthor(object.getString("author"));
        book.setPublisher(object.getString("publisher"));
        book.setDatePublished(object.getDate("datePublished"));
        book.setDescription(object.getString("description"));
        book.setCoverId(object.getString("coverId"));
        book.setPdfId(object.getString("pdfId"));
        book.setEpubId(object.getString("epubId"));
        book.setMobiId(object.getString("mobiId"));
        return book;
    }
}
