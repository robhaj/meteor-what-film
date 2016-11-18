import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { api_key } from '../config';
import { Mongo } from 'meteor/mongo';

Meteor.startup(() => {
  Meteor.methods({
    searchMovies: function(query) {
      var convertAsyncToSync  = Meteor.wrapAsync( HTTP.get ),
          resultOfAsyncToSync = convertAsyncToSync(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${query}`, {} );

      return resultOfAsyncToSync;
    },
    addMovieToLib: function(userId, movie) {
      Meteor.users.update({ _id: userId },{ $addToSet: { library: movie }})
    },
    clearLib: function(userId) {
      Meteor.users.update({_id:userId}, {$set:{library:[]}})
    },
    grabLib: function(userId) {
      let user = Meteor.users.findOne({_id:userId});
      return user.library;
    },
    grabRec: function(userId) {
      let lib = Meteor.users.findOne({_id:userId}).library
      let recs = [];
      var libIds = lib.map(function(el){
        return el.id
      })
      for (var i = 0; i<libIds.length;i++){
        var convertAsyncToSync  = Meteor.wrapAsync( HTTP.get ),
            resultOfAsyncToSync = convertAsyncToSync(`https://api.themoviedb.org/3/movie/${libIds[i]}/recommendations?api_key=${api_key}&language=en-US`, {} );
        resultOfAsyncToSync.data.results.forEach(function(el){
        recs.push(el);
        })
      }
      let nonDupedRecs = Array.from(new Set(recs));
      return nonDupedRecs;
    }
  })
})
