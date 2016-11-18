import { Router } from 'meteor/iron:router';

Router.route('/', function() {
  this.layout('MainLayout');
})

Router.route('/lib', function () {
  this.layout('LibraryTemplate');
});

Router.route('/rec', function() {
  this.layout('RecTemplate')
})
