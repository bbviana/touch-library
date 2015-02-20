package br.com.touchtec.library;

import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;

import java.util.HashSet;
import java.util.Set;

/**
 * @author bbviana
 */
public class App extends ResourceConfig{
    public App(){
        packages("br.com.touchtec.library");
        register(MultiPartFeature.class);
    }
}
