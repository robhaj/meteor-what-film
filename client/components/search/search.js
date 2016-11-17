import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http';
import { Session } from 'meteor/session';
import './search.html';

Template.search.onCreated(function searchOnCreated() {
});

Template.search.helpers({
  getMovie: function() {
    return Session.get('movie')
  }
});

Template.search.events({
  'click .search'(event, instance) {
    Meteor.call('searchMovies', [event.target.previousElementSibling.value], (err,res) => {
      if (err) {
        console.log(err)
      }
      Session.set('movie', res.data.results[0])
    })
  },
  'click .addToLib'(event, instance) {
    // Meteor call to add movie to lib
  }
});
