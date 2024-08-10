package com.family.be.service;

import com.family.be.dto.request.SaleRequest;
import com.family.be.models.Sale;

import java.util.List;
import java.util.Optional;

public interface SaleService {
    Optional<Sale> getSaleById(Long id);
    List<Sale> getAllSale();
    Sale createNewSale(SaleRequest saleRequest);
    Object deleteSaleById(Long id);
    boolean existsSaleByName(String name);
}
