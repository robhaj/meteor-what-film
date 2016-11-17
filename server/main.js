import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { api_key } from './config'
Meteor.startup(() => {
  Meteor.methods({
    searchMovies: function(query) {
      var convertAsyncToSync  = Meteor.wrapAsync( HTTP.get ),
          resultOfAsyncToSync = convertAsyncToSync(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${query}`, {} );

      return resultOfAsyncToSync;
    }
  })
})
