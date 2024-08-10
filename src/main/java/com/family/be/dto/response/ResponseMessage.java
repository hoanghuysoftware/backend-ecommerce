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
public class ResponseMessage {
    private String status;
    private String message;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date createAt;
    private Object data;
}
