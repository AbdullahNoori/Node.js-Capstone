var express = require('express');
const BookOffer = require('../models/booking');
const Offer = require('../models/offers');
const { connection } = require('mongoose');


module.exports = (app) => {
  // home page
  app.get('/', function(req, res) {
    var currentUser = req.user;
    Offer.find().lean()
    .then(offers => {

        res.render("index", { offers, currentUser });
    })
    .catch(err => {
        console.log(err);
    });
  });

  // Booking page
  app.get('/booking/:offer_id', function(req, res) {
    var currentUser = req.user;

    console.log(req.params.offer_id)

    Offer.findById(req.params.offer_id)
    .then(offer => {
      console.log(offer)
      res.render("booking-form", {offer, currentUser});
    })
    .catch(err => {
      console.log(err.message);
    });
  });

   // save offer booking
   app.post('/booking/new/:offer_id', (req, res) => {
    var currentUser = req.user;
    // INSTANTIATE INSTANCE OF POST MODEL
    Offer.findById(req.params.offer_id)
    .then(offer => {
      const bookOffer = new BookOffer(req.body);
      bookOffer.user = currentUser
      bookOffer.offer = offer
  
      // SAVE INSTANCE OF POST MODEL TO DB
      bookOffer.save((err, bookOffer) => {
        // REDIRECT TO THE ROOT
        console.log(bookOffer)
        return res.redirect('/thankyou/'+bookOffer._id);
      });
    })
    .catch(err => {
      console.log(err.message);
    });
   
  });

  // thank you page
  app.get('/thankyou/:id', function(req, res) {
    var currentUser = req.user;

    // LOOK UP THE POST
    BookOffer.findById(req.params.id)
    .then(bookoffer => {
      email = bookoffer.email
      name = bookoffer.name
      res.render("thankyou", {name, email, currentUser });
    })
    .catch(err => {
      console.log(err.message);
    });

  });
  

  // save offer booking
  app.post('/offer/new', (req, res) => {
    var currentUser = req.user;
    // INSTANTIATE INSTANCE OF POST MODEL
    const offer = new Offer(req.body);
    offer.user = currentUser

    // console.log(bookOffer)
    // SAVE INSTANCE OF POST MODEL TO DB
    offer.save((err, offer) => {
      // REDIRECT TO THE ROOT
      console.log(offer)
      return res.json({"status": "ok", "offer": offer})
    })
  });


};
