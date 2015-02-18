(function () {

  'use strict';

  module.exports = function () {

    var helper = this;

    this.Before(Meteor.bindEnvironment(function () {

      var world = helper.world;
      var next = arguments[arguments.length - 1];

      var boundCallback = function () {
        world.browser.
          init().
          setViewportSize({
            width: 1280,
            height: 1024
          }).
          timeoutsImplicitWait(1000).
          call(next);
      };

      var connection = DDP.connect(helper.world.mirrorUrl);
      connection.call('clearState', boundCallback);

    }));

    this.After(function () {
      var world = helper.world;
      var callback = arguments[arguments.length - 1];
      world.browser.
        end().
        call(callback);
    });

  };

})();