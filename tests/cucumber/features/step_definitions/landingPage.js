(function () {

  'use strict';

  var assert = require('assert');
  var url = require('url');

  module.exports = function () {

    var helper = this;

    this.Given(/^The setting with key "([^"]*)" and value "([^"]*)" has been set$/, function (key, value, callback) {

      function _getPublicMeteorSettingForKey (key) {
        function getValueByKey (o, k) { return o[k] }

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

    this.Given(/^I am a new visitor$/, function (callback) {
      callback();
    });

    this.Given(/^I navigate to the landing page$/, function (callback) {
      helper.world.browser.
        url(helper.world.mirrorUrl).
        saveScreenshot(process.env.PWD + '/navigate to.png').
        call(function () {
          callback()
        });
    });

    this.Then(/^I see the heading "([^"]*)"$/, function (expectedHeading, callback) {
      helper.world.browser.
        getText('h1', function (error, actualHeading) {
          assert.equal(actualHeading, expectedHeading);
          callback();
        });
    });

    this.When(/^I signup for the newsletter with "([^"]*)"$/, function (myEmail, callback) {

      // hold on to myEmail
      helper.world.users['I'].myEmail = myEmail;

      helper.world.browser.
        setValue('input#newsletterEmail', myEmail).
        click('button#submitNewsletterEmail').
        call(callback);
    });

    this.When(/^I receive a confirmation email from "([^"]*)"$/, function (fromAddress, callback) {


      // WEBDRIVER
      //helper.world.browser.
      //  url(url.resolve(helper.world.mirrorUrl, '/fake/inbox')).
      //  element('//*[contains(text(), "' + fromAddress + '")]', function (err, el) {
      //    assert.equal(err, null, fromAddress + ' not found');
      //    assert.notEqual(el, null, fromAddress + ' not found');
      //  }).
      //  element('//*[contains(text(), "' + helper.world.users['I'].myEmail + '")]', function (err, el) {
      //    assert.equal(err, null, helper.world.users['I'].myEmail + ' not found');
      //    assert.notEqual(el, null, helper.world.users['I'].myEmail + ' not found');
      //  })
      //  .call(callback);

      // HTTP
      var HTTP = Package['http'].HTTP;
      var sentEmail = HTTP.get(helper.world.mirrorUrl + 'fake/inbox').data[0];

      try {
        assert.equal(sentEmail.to, helper.world.users['I'].myEmail);
        assert.equal(fromAddress, sentEmail.from);
        callback();
      } catch (e) {
        callback.fail();
      }

      // DDP

      //var mirrorConnection = DDP.connect(helper.world.mirrorUrl);
      //var timeout = Meteor.setTimeout(function() {
      //  if (!mirrorConnection.status().connected) {
      //    callback.fail('DDP call timed out');
      //  }
      //}, 3000);
      //
      //mirrorConnection.call('getEmailsFromInboxStub', function (e, inboxContent) {
      //
      //  Meteor.clearTimeout(timeout);
      //
      //  var sentEmail = inboxContent[0];
      //
      //  try {
      //    assert.equal(sentEmail.to, helper.world.users['I'].myEmail);
      //    assert.equal(fromAddress, sentEmail.from);
      //    callback();
      //  } catch(e) {
      //    callback.fail(e);
      //  }
      //
      //
      //});

    });


    this.Then(/^I see a confirmation message saying "([^"]*)"$/, function (expectedMessage, callback) {
      helper.world.browser.
        waitForVisible('.newsletter-confirmation').
        getText('.newsletter-confirmation', function(err, actualMessage) {
          assert.equal(actualMessage, expectedMessage);
          callback();
        });
    });

  };

})();
