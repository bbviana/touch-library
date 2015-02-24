package br.com.touchtec.library;

import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;

/**
 * @author bbviana
 */
@Sleep
@Interceptor
public class SleepInterceptor {

    @AroundInvoke
    public Object logTime(InvocationContext ctx) throws Exception {
        try {
            Thread.sleep(300);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        Object proceed = ctx.proceed();
        return proceed;
    }
}
