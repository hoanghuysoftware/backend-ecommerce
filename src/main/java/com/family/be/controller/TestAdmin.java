package com.family.be.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/")
public class TestAdmin {

    @GetMapping
    public String testAdmin(){
        return "test admin";
    }
}
