package br.com.touchtec.library;

/**
 * @author bbviana
 */
public class Sleeper {
    public static void sleep(long time) {
        try {
            Thread.sleep(time);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
