// test/posts.js
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

// Import the Post model from our models folder so we
// we can use it in our tests.
const BookingOffer = require('../models/booking');
const server = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Booking Offer', function() {
  const agent = chai.request.agent(server);
  // Post that we'll use for testing purposes
  const newBookingOffer = {
      name: 'John Doe',
      email: 'jogn@gmail.com',
      offer: 'offer 1',
      message: 'post message'
  };

  it("should create with valid attributes at POST /booking/new", function (done) {
    // Checks how many posts there are now
    BookingOffer.estimatedDocumentCount()
    .then(function (initialDocCount) {
        agent
            .post("/booking/new")
            // This line fakes a form post,
            // since we're not actually filling out a form
            .set("content-type", "application/x-www-form-urlencoded")
            // Make a request to create another
            .send(newBookingOffer)
            .then(function (res) {
                BookingOffer.estimatedDocumentCount()
                    .then(function (newDocCount) {
                        // Check that the database has one more post in it
                        expect(res).to.have.status(200);
                        // Check that the database has one more post in it
                        expect(newDocCount).to.be.equal(initialDocCount + 1)
                        done();
                    })
                    .catch(function (err) {
                        done(err);
                    });
            })
            .catch(function (err) {
                done(err);
            });
    })
    .catch(function (err) {
        done(err);
    });
  });

  after(function () {
    BookingOffer.findOneAndDelete(newBookingOffer);
  });

  
});