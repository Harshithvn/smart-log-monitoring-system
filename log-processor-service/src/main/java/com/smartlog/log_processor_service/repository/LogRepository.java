package com.smartlog.log_processor_service.repository;

import com.smartlog.log_processor_service.model.LogEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LogRepository
        extends JpaRepository<LogEntry, Long> {

    List<LogEntry> findByLevel(String level);

    List<LogEntry> findByMessageContainingIgnoreCase(String keyword);

}