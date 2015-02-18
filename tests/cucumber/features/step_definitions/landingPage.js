(function () {

  'use strict';

  var assert = require('assert');
  var url = require('url');

  module.exports = function () {

    var helper = this;

    this.Given(/^The setting with key "([^"]*)" and value "([^"]*)" has been set$/, function (key, value, callback) {
      function _getPublicMeteorSettingForKey (key) {
        function getValueByKey (o, k) { return o[k]; }

        return key.split(".").reduce(getValueByKey, Meteor.settings);
      }

      try {
        var publicMeteorSettingForKey = _getPublicMeteorSettingForKey(key);
        assert.equal(publicMeteorSettingForKey, value);
        callback();
      } catch (e) {
        callback.fail(e.message);
      }
    });

    this.When(/^I navigate to the landing page$/, function (callback) {
      helper.world.browser.
        url(helper.world.mirrorUrl).
        call(callback);
    });


    this.When(/^I sign up for the newsletter with "([^"]*)"$/, function (myEmailAddress, callback) {
      helper.world.users['I'].emailAddress = myEmailAddress;
      helper.world.browser.
        setValue('input#newsletterEmail', myEmailAddress).
        click('button#submitNewsletterEmail').
        call(callback);
    });


    this.Then(/^I receive a confirmation email from "([^"]*)"$/, Meteor.bindEnvironment(function (fromEmailAddress, callback) {
      var HTTP = Package['http'].HTTP;
      var sentEmail = HTTP.get(helper.world.mirrorUrl + 'fake/inbox').data[0];
      try {
        assert.equal(sentEmail.to, helper.world.users['I'].emailAddress);
        assert.equal(fromEmailAddress, sentEmail.from);
        callback();
      } catch (e) {
        callback.fail(e);
      }
    }));


    this.Given(/^I do not a see a notification saying "([^"]*)"$/, function (expectedMessage, callback) {
      helper.world.browser.
        getText('.newsletter-confirmation', function (error, actualMessage) {
          assert.equal(actualMessage, "");
          callback();
        });
    });

    this.Then(/^I see a notification saying "([^"]*)"$/, function (expectedMessage, callback) {
      helper.world.browser.
        getText('.newsletter-confirmation', function (error, actualMessage) {
          assert.equal(actualMessage, expectedMessage);
          callback();
        });
    });




    this.Given(/^I have entered chapter preview descriptions$/, function (callback) {
      callback();
    });

    this.Then(/^I see the chapters descriptions in the preview section$/, function (callback) {
      helper.world.browser.
        getText('p', function (error, actualHeading) {
          assert.equal(actualHeading[0], "This chapter will cover item 1");
          callback();
        });
    });

    this.Then(/^the chapters are in order$/, function (callback) {
      helper.world.browser.
        getText('h2', function (error, actualHeading) {
          assert.deepEqual(actualHeading, ["Item 1", "Item 2"]);
          callback();
        });
    });

    this.When(/^I click on the chapter link$/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      helper.world.browser.
        click('.chapter-link').
        call(callback);
    });

    this.Then(/^I should be at the chapter preview page$/, function (callback) {
      helper.world.browser.
        url(function (err, url) {
          assert.equal(url.value, helper.world.mirrorUrl + "chapter/1")
          callback();
        });
    });

  };

})();
