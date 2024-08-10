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
public class SaleRequest {
    private String nameSale;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date dateStart;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date dateEnd;
    private Long amongSale;
}
