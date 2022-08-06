package com.kinki.land.app.controller;

import com.kinki.land.app.common.Log;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("hello")
    public String hello() {
        Log.error("Hello World");
        return "hello controller";
    }
}
