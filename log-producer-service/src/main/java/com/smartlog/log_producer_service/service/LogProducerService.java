package com.smartlog.log_producer_service.service;

import com.smartlog.log_producer_service.model.LogEvent;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class LogProducerService {

    private final RestTemplate restTemplate = new RestTemplate();

    public String sendLog(LogEvent logEvent) {

        String url = "http://localhost:8082/api/logs";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<LogEvent> request =
                new HttpEntity<>(logEvent, headers);

        restTemplate.postForEntity(
                url,
                request,
                String.class
        );

        return "Log sent successfully";
    }
}