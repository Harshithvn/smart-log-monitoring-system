package com.smartlog.log_producer_service.controller;

import com.smartlog.log_producer_service.model.LogEvent;
import com.smartlog.log_producer_service.service.LogProducerService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin(origins = "*")
public class LogProducerController {

    private final LogProducerService producerService;

    public LogProducerController(LogProducerService producerService) {
        this.producerService = producerService;
    }

    @PostMapping
    public String sendLog(@RequestBody LogEvent logEvent) {
        return producerService.sendLog(logEvent);
    }
}