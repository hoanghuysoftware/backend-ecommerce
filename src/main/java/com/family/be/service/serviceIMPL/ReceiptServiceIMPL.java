package com.family.be.service.serviceIMPL;

import com.family.be.dto.request.ProductRequest;
import com.family.be.dto.request.ReceiptRequest;
import com.family.be.models.*;
import com.family.be.repository.*;
import com.family.be.service.ReceiptService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ReceiptServiceIMPL implements ReceiptService {
    private final ReceiptRepository receiptRepository;
    private final ProductRepository productRepository;
    private final ProductAttributeRepository productAttributeRepository;
    private final ImporterRepository importerRepository;
    private final BrandRepository brandRepository;
    private final AdminRepository adminRepository;

    @Override
    @Transactional
    public Receipt createNewReceiptForProductExists(ReceiptRequest receiptRequest) {
        Importer importer = importerRepository.findImporterById(receiptRequest.getImporterId()).orElseThrow(
                () -> new RuntimeException("Not found importer has id: " + receiptRequest.getImporterId()));
        Admin admin = adminRepository.getAdminById(receiptRequest.getAdminId());

        Receipt receipt = Receipt.builder()
                .importer(importer)
                .admin(admin)
                .dateImport(new Date())
                .totalReceipt(0L)
                .build();

        List<DetailReceipt> detailReceiptSet = new ArrayList<>();
        receiptRequest.getDetails().forEach(item -> {
            Product product = productRepository.getProductById(item.getProductId()).orElseThrow(
                    () -> new RuntimeException("Not found product exists!"));

            product.setPriceProduct(item.getPriceImport() + 2000000);
            product.setQuantityProduct(product.getQuantityProduct() + item.getQuantityImport());
            receipt.setTotalReceipt(receipt.getTotalReceipt() + (item.getPriceImport() * item.getQuantityImport()));
            DetailReceipt detailReceipt = DetailReceipt.builder()
                    .receipt(receipt)
                    .product(product)
                    .priceDetailReceipt(item.getPriceImport())
                    .quantityDetailReceipt(item.getQuantityImport())
                    .build();
            detailReceiptSet.add(detailReceipt);
        });
        receipt.setDetailReceipts(detailReceiptSet);
        return receiptRepository.save(receipt);
    }

    @Override
    @Transactional
    public Receipt createNewReceiptForProductNew(ReceiptRequest receiptRequest) {
        Importer importer = importerRepository.findImporterById(receiptRequest.getImporterId()).orElseThrow(
                () -> new RuntimeException("Not found importer has id: " + receiptRequest.getImporterId()));
        Admin admin = adminRepository.getAdminById(receiptRequest.getAdminId());

        Receipt receipt = Receipt.builder()
                .importer(importer)
                .admin(admin)
                .dateImport(new Date())
                .totalReceipt(0L)
                .build();

        List<DetailReceipt> detailReceiptSet =  new ArrayList<>();
        receiptRequest.getDetails().forEach(item -> {

            Product product = createProduct(item.getProductRequest());
            product.setPriceProduct(item.getPriceImport() + 2000000);
            product.setQuantityProduct(product.getQuantityProduct() + item.getQuantityImport());

            receipt.setTotalReceipt(receipt.getTotalReceipt() + (item.getPriceImport()* item.getQuantityImport()));
            DetailReceipt detailReceipt = DetailReceipt.builder()
                    .receipt(receipt)
                    .product(product)
                    .priceDetailReceipt(item.getPriceImport())
                    .quantityDetailReceipt(item.getQuantityImport())
                    .build();
            detailReceiptSet.add(detailReceipt);
        });
        receipt.setDetailReceipts( detailReceiptSet);
        return receiptRepository.save(receipt);
    }

    public Product createProduct(ProductRequest productRequest){
        // init product
        Product product = Product.builder()
                .nameProduct(productRequest.getNameProduct())
                .cpuProduct(productRequest.getCpuProduct())
                .ramProduct(productRequest.getRamProduct())
                .screenProduct(productRequest.getScreenProduct())
                .romProduct(productRequest.getRomProduct())
                .cardProduct(productRequest.getCardProduct())
                .descProduct(productRequest.getDescProduct())
                .priceProduct(productRequest.getPriceProduct())
                .quantityProduct(productRequest.getQuantityProduct())
                .build();

        // find and add set product attribute into product
//        Set<ProductAttribute> productAttributeSet = new HashSet<>();
//        productRequest.getAttributeIds().forEach(item -> {
//            ProductAttribute productAttribute = productAttributeRepository.findProductAttributeById(item).orElseThrow(
//                    () -> new RuntimeException("Not found product attribute !")
//            );
//            productAttributeSet.add(productAttribute);
//        });
//        product.setProductAttributes(productAttributeSet);

        // find and add brand into product
        Brand brand = brandRepository.findBrandById(productRequest.getBrandId()).orElseThrow(
                () -> new RuntimeException("Not found brand !")
        );
        product.setBrand(brand);

        // find and add images into product
        Set<Image> imageSet = new HashSet<>();
        productRequest.getImages().forEach(image -> {
            Image img = Image.builder()
                    .product(product)
                    .imageData(image)
                    .build();
            imageSet.add(img);
        });
        product.setImages(imageSet);

        return productRepository.save(product);
    }

    @Override
    public List<Receipt> getAllReceipt() {
        return receiptRepository.findAll();
    }
}
