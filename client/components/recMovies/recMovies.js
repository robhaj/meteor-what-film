import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http';
import { Session } from 'meteor/session';
import './recMovies.html';

Template.recMovies.onCreated(function searchOnCreated() {
});

Template.recMovies.helpers({
  getRecs: function() {
    return Session.get('recommendations');
  }
});

Template.recMovies.events({
  'click .grabRec'(event, instance) {
    Meteor.call('grabRec', Meteor.userId(), (err,res) => {
      if (err) {
        console.log(err)
      }
      Session.set('recommendations', res)
    })
  },
});
