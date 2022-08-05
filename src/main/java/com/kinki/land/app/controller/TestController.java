package com.kinki.land.app.controller;

import com.kinki.land.app.Application;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {
    private static final Logger logger = LogManager.getLogger(TestController.class);

    @GetMapping("hello")
    public String hello() {
        logger.error("Hello World");
        return "hello controller";
    }
}
