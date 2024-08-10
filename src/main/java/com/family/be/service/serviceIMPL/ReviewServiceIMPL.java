package com.family.be.service.serviceIMPL;

import com.family.be.dto.request.ReviewRequest;
import com.family.be.models.OrderInfo;
import com.family.be.models.Product;
import com.family.be.models.Review;
import com.family.be.repository.OrderRepository;
import com.family.be.repository.ProductRepository;
import com.family.be.repository.ReviewRepository;
import com.family.be.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceIMPL implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;


    @Override
    @Transactional
    public Review addReview(ReviewRequest reviewRequest) {
        Product productSearch = productRepository.getProductById(reviewRequest.getIdProduct()).orElseThrow(
                () -> new RuntimeException("Product not found")
        );
        OrderInfo orderSearch = orderRepository.findOrderInfoById(reviewRequest.getIdOrder()).orElseThrow(
                ()-> new RuntimeException("Order not found")
        );
        Review review = Review.builder()
                .contentReview(reviewRequest.getContentReview())
                .nameCustomer(orderSearch.getCustomer().getNameCustomer())
                .dateReview(new Date())
                .order(orderSearch)
                .product(productSearch)
                .build();

        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getAllReviewByIdProduct(Long idProduct) {
        return reviewRepository.findAllByProduct_Id(idProduct);
    }

    @Override
    public boolean existsReviewBuOrderId(Long idOrder) {
        return reviewRepository.existsByOrder_Id(idOrder);
    }
}
