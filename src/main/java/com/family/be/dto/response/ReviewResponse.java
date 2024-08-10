package com.family.be.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponse {
    private String content;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date dateReview = new Date();
    private Long idProduct;
    private Long idOrder;
}
