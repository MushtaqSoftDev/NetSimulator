# Property Simulator:
A data-driven property investment simulator that calculates Net Monthly income and return on investment(ROI) over a 3-year period, featuring a market prediction based on historical datasets.

### Features:
ROI Calculation: Automated 3-year projection with decreasing agency commissions (30%, 25%, 20%).

Data-Driven Prediction: Validates user rent inputs against a historical CSV dataset of property listings.

Admin Dashboard: Admin interface to monitor all simulation requests and emails.

Responsive Design: Fully optimized for mobile and desktop using Bootstrap 5.

Dockerized Stack: Instant deployment with Node.js, MongoDB, and Mongo-Express.


### Tech Stack:
Frontend: EJS, Bootstrap 5
Backend: Node.js, Express.js
Database: MongoDB (via Mongoose)
DevOps: Docker, Docker Compose
Data Processing: csv-parser for historical analysis

### Prediction Logic:
 ROI calculator calculate the avg market listing price & then compares user's monthlyRent input:
  * Hight Probability: Input is within 110% of market average.
  * Moderate Probability: Input is within 150% of market average.
  * Low Probability: Input exceeds 150% of market average (Risk).


### Prerequisites:
 Docker & Docker Compose installed.
 Sign up the containers:
    docker-compose up --build
 Access the application:
    App: localhost:3000
    For admin-dashboard: localhost:3000/admin
    Database GUI: localhost:8081



