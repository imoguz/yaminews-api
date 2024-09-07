# YamiNews-API Project

The Yamistore API is a Node.js-based backend service for an e-commerce platform. This project collects news, weather, and financial data from various APIs and stores this data in Firebase Firestore. It also updates the database with cron jobs at regular intervals.

## Advanced-Querying

The project provides advanced querying capabilities for efficient data retrieval.

## Technologies Used

- **Firestore Database**: Uses Firebase Firestore for organizing and storing data.

- **NodeJS**: Node.js is a JavaScript runtime that allows developers to execute server-side code, facilitating the building of scalable and efficient network applications.

- **ExpressJS**: Express is used as the web application framework to build robust and scalable APIs.

## Features

- **News Data**: Collects news data from NewsAPI and CurrentsAPI.
- **Weather Data**: Collects weather data from WeatherAPI.
- **Cron Jobs**: Periodically updates the database with data from the APIs.

## API Endpoints

The backend provides the following API endpoints:

- **Product**
  - GET `/yaminews/api/v1/articles?collection=collection_name`
  - GET `/yaminews/api/v1/articles?collection=collection_name/:id`

## API Documentation

The API documentation is available in various formats:

- Swagger
- ReDoc
- JSON

Explore the API documentation for a detailed understanding of available endpoints and functionalities.

Feel free to clone the repository and customize the project according to your requirements.

## Contributing

We welcome contributions from the community. If you find any issues or have suggestions for improvement, please feel free to open an issue or create a pull request.

## Setup

1. Clone the repository: `git clone https://github.com/imoguz/yaminews-api.git`
2. Navigate to the backend directory: `cd yaminews-api`
3. Install dependencies: `npm install`
4. Configure environment variables (see `.env.example` for reference).
5. Start the server: `npm start`
