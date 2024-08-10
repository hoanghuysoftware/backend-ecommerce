package com.family.be.service;

import com.family.be.dto.request.ReceiptRequest;
import com.family.be.models.Receipt;

import java.util.List;

public interface ReceiptService {
    Receipt createNewReceiptForProductExists(ReceiptRequest receiptRequest);
    Receipt createNewReceiptForProductNew(ReceiptRequest receiptRequest);
    List<Receipt> getAllReceipt();
}
