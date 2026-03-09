# Movie Ticket Booking Portal

A full-stack web application built for a college project allowing users to browse movies, select seats, and book tickets.

## Tech Stack
- **Frontend**: React, React Router, Axios, CSS (Glassmorphism & Dark Mode)
- **Backend**: Node.js, Express, UUID, CORS
- **Database**: Local JSON files (movies.json, users.json, bookings.json)

## Prerequisites
- Node.js installed on your machine

## Installation & Running the App

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd movie-ticket-portal/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
   *The backend server will run on http://localhost:5000*

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd movie-ticket-portal/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   Also verify that `axios` and `react-router-dom` are installed:
   ```bash
   npm install axios react-router-dom
   ```
3. Start the React app:
   ```bash
   npm start
   ```
   *The frontend will open in your browser at http://localhost:3000*

## Features Implemented
- **User Authentication**: Signup and Login with session persistence using `localStorage`.
- **Home & Movies Page**: Browse available movies and search functionality.
- **Seat Selection**: Interactive seat grid with available, selected, and booked statuses.
- **Payment Gateway Simulation**: Form for card details before generating a ticket.
- **User Dashboard**: View past bookings and tickets.
- **Admin**: Backend API routes created for adding/deleting movies.

## Project Structure
- `/backend`: Contains `server.js`, `routes/`, and `data/` for storing JSON storage.
- `/frontend/src`: Contains all React components, pages, `App.js`, and `styles.css`.
