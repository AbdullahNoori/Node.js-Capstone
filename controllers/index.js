var express = require('express');
const BookOffer = require('../models/booking');
const { connection } = require('mongoose');


module.exports = (app) => {
  // home page
  app.get('/', function(req, res) {
    var currentUser = req.user;
    console.log(req.body)
    res.render('index', { currentUser });
  });

  // Booking page
  app.get('/booking/:offer_id', function(req, res) {
    var currentUser = req.user;
    console.log(currentUser, req.params.offer_id)
    res.render('booking-form', { currentUser });
  });

  // Booking page
  app.get('/create/offer', function(req, res) {
    var currentUser = req.user;
    console.log(currentUser)
    res.render('createOffer-form', { currentUser });
  });

  

   // save offer booking
   app.post('/booking/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const bookOffer = new BookOffer(req.body);

    console.log(bookOffer)
    // SAVE INSTANCE OF POST MODEL TO DB
    bookOffer.save((err, bookOffer) => {
      // REDIRECT TO THE ROOT
      console.log(bookOffer)
      return res.redirect('/thankyou/'+bookOffer._id);
    })
  });

  // thank you page
  app.get('/thankyou/:id', function(req, res) {
    var currentUser = req.user;

    // LOOK UP THE POST
    BookOffer.findById(req.params.id)
    .then(bookoffer => {
      console.log(bookoffer)
      email = bookoffer.email
      name = bookoffer.name
      res.render("thankyou", { name, email });
    })
    .catch(err => {
      console.log(err.message);
    });

  });
  


};
