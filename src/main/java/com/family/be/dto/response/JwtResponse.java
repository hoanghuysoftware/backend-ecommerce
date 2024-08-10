package com.family.be.dto.response;

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
public class JwtResponse {
    private String status;
    private Long idUser;
    private String message;
    private String type;
    private String token;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date createAt;
}
