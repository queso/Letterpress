UI.registerHelper('bookTitle', function () {
  return Meteor.settings.public.book.title;
});

Template.header.helpers({
  'imageSrc': Meteor.settings.public.book.header.imageSrc,
  'imageCaption': function () {
    return Meteor.settings.public.book.header.imageCaption;
  }
});

Template.chapters.helpers({
  'chapters': function () {
    return Chapters.find({}, {sort: {chapterNumber: 1}});
  }
});


Template.newsletter.events({

  'click button#submitNewsletterEmail': function () {
    Meteor.call('newsletterSignup', $('input#newsletterEmail').val(), function(err, res) {
      if (!err) {
        $('.newsletter-confirmation').show();
      }
    });
  }

});
