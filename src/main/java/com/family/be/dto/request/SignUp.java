package com.family.be.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUp {
    private String nameRequest;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date birthDay;
    private boolean gender;
    private String phoneNumber;
    private String email;
    private String address;
    private String username;
    private String password;
    private String roleName;
}
