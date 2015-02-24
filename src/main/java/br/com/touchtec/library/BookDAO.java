package br.com.touchtec.library;

import com.mongodb.*;
import org.bson.types.Binary;
import org.bson.types.ObjectId;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import static java.lang.String.format;

/**
 * @author bbviana
 */
@ApplicationScoped
public class BookDAO {

    private DB db;

    @PostConstruct
    void loadMongoDB() throws Exception {
        System.out.println("Carregando 'touch-library' database...");
        MongoClient client = new MongoClient("localhost", 27017);
        db = client.getDB("touch-library");
    }


    public Book insert(Book book) {
        DBObject object = BasicDBObjectBuilder.start()
                .append("title", book.getTitle())
                .append("category", book.getCategory())
                .append("author", book.getAuthor())
                .append("publisher", book.getPublisher())
                .append("datePublished", book.getDatePublished())
                .append("description", book.getDescription())
                .get();

        db.getCollection("books").insert(object);
        book.setId(object.get("_id").toString());
        System.out.println(format("Livro %s salvo no banco.", book.getTitle()));

        return book;
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

    private static Book toBook(BasicDBObject object) {
        Book book = new Book();
        book.setId(object.getObjectId("_id").toString());
        book.setTitle(object.getString("title"));
        book.setCategory(object.getString("category"));
        book.setAuthor(object.getString("author"));
        book.setPublisher(object.getString("publisher"));
        book.setDatePublished(object.getDate("datePublished"));
        book.setDescription(object.getString("description"));
        return book;
    }

    private static Binary toBinary(String filePath) {
        try {
            byte[] bytes = Files.readAllBytes(Paths.get(filePath));
            return new Binary(bytes);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
