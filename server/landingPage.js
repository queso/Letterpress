Meteor.methods({

  'newsletterSignup' : function(emailAddress) {
    Email.send({
      to: emailAddress,
      from: 'letterpress@xolv.io',
      subject: 'Welcome to the news letter',
      text: 'You are now on the new letter'
    });
  }

});