package com.family.be.service.serviceIMPL;

import com.family.be.dto.request.SaleRequest;
import com.family.be.models.Sale;
import com.family.be.repository.SaleRepository;
import com.family.be.service.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SaleServiceIMPL implements SaleService {
    private final SaleRepository saleRepository;

    @Override
    public Optional<Sale> getSaleById(Long id) {
        return saleRepository.findSaleById(id);
    }

    @Override
    public List<Sale> getAllSale() {
        return saleRepository.findAll();
    }

    @Override
    public Sale createNewSale(SaleRequest saleRequest) {
        return saleRepository.save(Sale.builder()
                .nameSale(saleRequest.getNameSale())
                .dateStart(saleRequest.getDateStart())
                .dateEnd(saleRequest.getDateEnd())
                .amongSale(saleRequest.getAmongSale())
                .build());
    }

    @Override
    public Object deleteSaleById(Long id) {
        saleRepository.deleteById(id);
        return null;
    }

    @Override
    public boolean existsSaleByName(String name) {
        return saleRepository.existsByNameSale(name);
    }
}
