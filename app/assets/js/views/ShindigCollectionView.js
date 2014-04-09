'use strict';
var Backbone      = require('backbone');
var $             = require('jquery');
Backbone.$    = $;
var ShindigView   = require('./ShindigView');

module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'ShindigList',

  initialize: function() {
    this.collection.on('add', this.addShindig, this);
  },

  addShindig: function(shindig) {
    var shindigView = new ShindigView({model: shindig});
    console.log(formatTime(shindigView.model.attributes.start_time));
   // shindigView.model.attributes.end_time = formatTime(shindigView.model.attributes.end_time);
    console.log(shindigView.el);
    this.$el.append(shindigView.el);
  },

  addAll: function() {
    this.fetch();
    this.collection.forEach(this.addShindig);
  },

  render: function() {
    this.addAll();
  }


});

  function formatTime(time){
    var hh = time.substr(0,2)*1;
      var m = time.substr(3,2)*1;
      var dd = "AM";
      var h = hh;
      if (h >= 12) {
          h = hh-12;
          dd = "PM";
      }
      if (h == 0) {
          h = 12;
      }
      m = m<10?"0"+m:m;
      h = h<10?"0"+h:h;
      var pattern = new RegExp("0?"+hh+":"+m);
      var T = h+":"+m;
      T += " "+dd;    
      return T;
  }

