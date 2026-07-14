# Smart Log Monitoring System

## Overview

Smart Log Monitoring System is a full-stack web application developed to simplify application log management. It allows users to generate, store, search, and monitor application logs through an interactive dashboard. The system helps developers quickly identify errors, warnings, and important events in real time.

## Features

- Generate application logs
- Store logs in MySQL database
- Search logs using keywords
- Filter logs by log level
- Interactive dashboard with charts
- Real-time log statistics
- RESTful APIs using Spring Boot
- Responsive React user interface

## Tech Stack

### Frontend
- React.js
- JavaScript
- HTML
- CSS
- Axios
- Recharts

### Backend
- Spring Boot
- Spring Data JPA
- REST API
- Maven

### Database
- MySQL

### Tools
- Docker
- Git
- GitHub
- VS Code
- IntelliJ IDEA

## Project Structure

```
smart-log-monitoring
│
├── smart-log-dashboard
├── log-producer-service
├── log-processor-service
└── docker-compose.yml
```

## System Architecture

```
React Dashboard
        │
        ▼
Spring Boot REST APIs
        │
        ▼
Log Producer Service
        │
        ▼
Log Processor Service
        │
        ▼
MySQL Database
```

## Installation

### Clone the repository

```bash
git clone https://github.com/Harshithvn/smart-log-monitoring-system.git
```

### Backend

```bash
cd log-producer-service
mvn spring-boot:run
```

```bash
cd ../log-processor-service
mvn spring-boot:run
```

### Frontend

```bash
cd smart-log-dashboard
npm install
npm start
```

## API Endpoints

### Generate Log

```
POST /api/logs
```

### Get All Logs

```
GET /api/logs
```

### Search Logs

```
GET /api/logs/search?keyword=test
```

## Future Enhancements

- Apache Kafka integration
- Elasticsearch integration
- AI-based anomaly detection
- Email alerts
- Authentication & Authorization
- Cloud deployment
- Log analytics and reporting

## Author

**Harshith V N**

B.E. Computer Science and Engineering  
University Visvesvaraya College of Engineering (UVCE)

GitHub: https://github.com/Harshithvn
