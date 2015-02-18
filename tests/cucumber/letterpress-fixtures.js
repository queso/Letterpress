(function () {

  'use strict';

  if (Meteor.isClient) {
    //if (Meteor.isClient || !process.env.IS_MIRROR) {
    return;
  }

  Meteor.startup(function () {

    var emails = new Mongo.Collection('FakeEmails');

    Chapters.remove({});
    Chapters.insert({
      title: "Item 2",
      description: "This chapter will cover item 2",
      previewContent: "",
      premiumContent: "",
      chapterNumber: 2
    });
    Chapters.insert({
      title: "Item 1",
      description: "This chapter will cover item 1",
      chapterNumber: 1
    });

    _initInboxStub();

    Meteor.methods({
      'clearState': function () {
        Chapters.remove({});
        emails.remove({});
      },
      'getEmailsFromInboxStub': function () {
        return emails.find().fetch()
      }
    });

    function _initInboxStub () {

      emails.remove({});
      Email.send = function (options) {
        // store those somewhere
        emails.insert(options);
      };

      Router.route('fake/inbox', function () {
        this.response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
        this.response.end(JSON.stringify(emails.find().fetch()));
      }, {where: 'server'});

    }

  });


})();

