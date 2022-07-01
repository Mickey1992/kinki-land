package com.kinki.land.app.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.PathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.reactive.config.ResourceHandlerRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;

import static org.springframework.web.reactive.function.server.RouterFunctions.route;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Configuration
@EnableWebFlux
public class WebConfig implements WebFluxConfigurer {
    private static final Pattern _EXTENSION_REGEX = Pattern.compile("^\\w+$");

    @Bean
    /*
      request method:
        POST: do server side process
        GET: check url
      request url:
        /api/xxxx: server side process
        a file path: request file
        otherwise: index.html
     */
    public RouterFunction<ServerResponse> htmlRouter() {
        Resource indexHTML = new PathResource("public/index.html");
        return route(request -> {
            if (!"GET".equals(request.methodName())) return false;
            String path = request.path();
            if (path.startsWith("/api/")) return false;
            int dotIndex = path.lastIndexOf('.');
                    return dotIndex < 0 || !_EXTENSION_REGEX.matcher(path.substring(dotIndex + 1)).find();
                }, request -> ok()
                .contentType(MediaType.TEXT_HTML)
                .bodyValue(indexHTML)
        );
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("**")
                .addResourceLocations("/public")
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS));
    }
}
