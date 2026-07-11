package com.smartlog.log_processor_service.service;

import com.smartlog.log_processor_service.model.LogEntry;
import com.smartlog.log_processor_service.repository.LogRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class LogService {

    private final LogRepository logRepository;

    public LogService(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    // Save Log
    public LogEntry saveLog(LogEntry logEntry) {

        if (logEntry.getTimestamp() == null) {
            logEntry.setTimestamp(Instant.now());
        }

        return logRepository.save(logEntry);
    }

    // Get All Logs
    public List<LogEntry> getAllLogs() {
        return logRepository.findAll();
    }

    // Get Logs By Level
    public List<LogEntry> getLogsByLevel(String level) {
        return logRepository.findByLevel(level);
    }

    // Search Logs By Message
    public List<LogEntry> searchLogs(String keyword) {
        return logRepository.findByMessageContainingIgnoreCase(keyword);
    }
}