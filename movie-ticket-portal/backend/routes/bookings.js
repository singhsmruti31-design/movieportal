const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const bookingsFilePath = path.join(__dirname, '../data/bookings.json');

const getBookings = () => {
    try {
        const data = fs.readFileSync(bookingsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const saveBookings = (bookings) => {
    fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2));
};

// Book a ticket
router.post('/book-ticket', (req, res) => {
    const { userId, movieId, movieTitle, seats, showtime, totalPrice } = req.body;

    if (!userId || !movieId || !seats || seats.length === 0 || !showtime) {
        return res.status(400).json({ message: 'Invalid booking data' });
    }

    const bookings = getBookings();

    // Check if seats are already booked for this movie & showtime
    const alreadyBooked = bookings.filter(b => b.movieId === movieId && b.showtime === showtime);
    const bookedSeats = alreadyBooked.map(b => b.seats).flat();

    const conflict = seats.some(seat => bookedSeats.includes(seat));
    if (conflict) {
        return res.status(400).json({ message: 'One or more selected seats are already booked' });
    }

    const newBooking = {
        id: uuidv4(),
        userId,
        movieId,
        movieTitle,
        seats,
        showtime,
        totalPrice: totalPrice || 0,
        bookingDate: new Date().toISOString()
    };

    bookings.push(newBooking);
    saveBookings(bookings);

    res.status(201).json({ message: 'Booking successful', booking: newBooking });
});

// Get user bookings
router.get('/my-bookings', (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    const bookings = getBookings();
    const userBookings = bookings.filter(b => b.userId === userId);

    res.status(200).json(userBookings);
});

// View all bookings (Admin)
router.get('/', (req, res) => {
    const bookings = getBookings();
    res.status(200).json(bookings);
});

module.exports = router;
