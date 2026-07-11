package com.smartlog.log_processor_service.controller;

import com.smartlog.log_processor_service.model.LogEntry;
import com.smartlog.log_processor_service.service.LogService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin(origins = "http://localhost:3000")
public class LogQueryController {

    private final LogService logService;

    public LogQueryController(LogService logService) {
        this.logService = logService;
    }

    // Get all logs
    @GetMapping
    public List<LogEntry> getAllLogs() {
        return logService.getAllLogs();
    }

    // Get logs by level
    @GetMapping("/level/{level}")
    public List<LogEntry> getLogsByLevel(@PathVariable String level) {
        return logService.getLogsByLevel(level);
    }

    // Search logs by message
    @GetMapping("/search")
    public List<LogEntry> searchLogs(@RequestParam String keyword) {
        return logService.searchLogs(keyword);
    }

    // Add new log
    @PostMapping
    public LogEntry addLog(@RequestBody LogEntry logEntry) {
        return logService.saveLog(logEntry);
    }
}