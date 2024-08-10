package com.family.be.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user/")
public class TestUser {

    @GetMapping
    public String doTest(){
        return "Test user ok!";
    }
}
