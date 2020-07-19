var express = require('express');
const BookOffer = require('../models/booking');
const User = require('../models/user');


module.exports = (app) => {
    // home page
    app.get('/dashboard', function(req, res) {
        var currentUser = req.user;
        
        BookOffer.find({ user: currentUser }).populate('offer').lean()
        .then(bookOffers => {
            console.log(bookOffers)

            res.render("dashboard", { bookOffers, currentUser });
        })
        .catch(err => {
            console.log(err);
        });
    });
}