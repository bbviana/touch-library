package br.com.touchtec.library.model;

import com.mongodb.*;
import org.bson.types.ObjectId;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.List;

/**
 * @author bbviana
 */
public class MongoTest {

    private static DB db;

    @BeforeClass
    public static void loadDB() throws Exception {
        MongoClient mongo = new MongoClient("localhost", 27017);
        db = mongo.getDB("touch-library");
    }

    @Test
    public void testConnection() {
        DBCollection books = db.getCollection("books");

        // insert
        BasicDBObject book = new BasicDBObject();
        book.put("title", "Book 2");
        book.put("author", "Author 2");
        book.put("publisher", "Casa do COdigo");
        books.insert(book);

        ObjectId id = book.getObjectId("_id");
        System.out.println(id);
    }

    @Test
    public void testFindById() {
        DBCollection books = db.getCollection("books");

        DBObject one = books.findOne(new ObjectId("54e62a4d31da533d0cbc1861"));
        System.out.println(one);
    }
}
