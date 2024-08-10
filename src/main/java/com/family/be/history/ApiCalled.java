package com.family.be.history;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class ApiCalled implements HandlerInterceptor {
    private final ApiLogRepository apiLogRepository;

    @Override
    public void afterCompletion(HttpServletRequest request,
                                HttpServletResponse response,
                                Object handler,
                                Exception ex)
            throws Exception {
        String apiEndPoint = request.getRequestURI();
        String method = request.getMethod();
        Date timestamp = new Date();
        int statusCode = response.getStatus();
        ApiLog apiLog = ApiLog.builder()
                .responseStatusCode(statusCode)
                .endPoint(apiEndPoint)
                .method(method)
                .timestamp(timestamp)
                .request(handler.toString())
                .build();
        apiLogRepository.save(apiLog);
    }
}
