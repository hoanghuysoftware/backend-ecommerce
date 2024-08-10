package com.family.be.service;

import com.family.be.dto.request.ReviewRequest;
import com.family.be.models.Review;

import java.util.List;

public interface ReviewService {
    Review addReview(ReviewRequest reviewRequest);
    List<Review> getAllReviewByIdProduct(Long idProduct);
    boolean existsReviewBuOrderId(Long idOrder);
}
