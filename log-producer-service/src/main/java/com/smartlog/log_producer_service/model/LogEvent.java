package com.smartlog.log_producer_service.model;

public class LogEvent {

    private String level;
    private String message;

    public LogEvent() {
    }

    public LogEvent(String level, String message) {
        this.level = level;
        this.message = message;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}