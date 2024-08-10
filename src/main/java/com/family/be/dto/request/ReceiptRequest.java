package com.family.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReceiptRequest {
    private Long importerId;
    private Long adminId;
    private List<DetailsReceiptRequest> details;
}
