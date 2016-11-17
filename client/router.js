import { Router } from 'meteor/iron:router';

Router.route('/', function() {
  this.render('Home');
})

Router.route('/library', function () {
  this.render('library');
});
