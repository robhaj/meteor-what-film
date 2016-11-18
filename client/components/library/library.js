import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http';
import { Session } from 'meteor/session';
import './library.html';

Template.library.onCreated(function searchOnCreated() {
});

Template.library.helpers({
  getLibrary: function() {
    return Session.get('library')
  }
});

Template.library.events({
  'click .grabLib'(event, instance) {
    Meteor.call('grabLib', Meteor.userId(), (err,res) => {
      if (err) {
        console.log(err)
      }
      Session.set('library', res)
    })
  },
  'click .clearLib'(event, instance) {
    Meteor.call('clearLib', Meteor.userId(), (err,res) => {
      if (err) {
        console.log(err)
      }
      console.log(res)
    })
  }
});
