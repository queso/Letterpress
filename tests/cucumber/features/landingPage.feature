Feature: Authorable Landing Page

  As an author
  I want to curate a landing page
  So that I can entice people to purchase my book

#  Scenario: Visitors can see a book heading
#    Given The setting with key "public.book.title" and value "Letterpress by Xolv.io" has been set
#    And I am a new visitor
#    When I navigate to the landing page
#    Then I see the heading "Letterpress by Xolv.io"

  #Happy path
  Scenario: Visitors can sign up for the email list
    Given I navigate to the landing page
    When I signup for the newsletter with "me@example.com"
    Then I receive a confirmation email from "letterpress@xolv.io"
    And I see a confirmation message saying "You are on the list!"


##    And my email address is stored
#  Scenario: Newsletter subscribers receive an email
#    Given user x has registereed
#    And user y has registsreed
#    When I signup for the newsletter with "me@example.com"
#    Then I receive a confirmation email from "letterpress@xolv.io"
##    And my email address is stored > INTEGRATION
#    And I see a confirmation message


