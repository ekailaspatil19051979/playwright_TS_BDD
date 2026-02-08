Feature: Contact Us Form
  As a user
  I want to send messages to the hotel
  So that I can get answers to my queries.

  Background:
    Given I am on the booking page

  @smoke
  Scenario: Successfully send a message via contact form
    When I submit the contact form with the following details:
      | name | Jim Beam           |
      | email| jim@example.com    |
      | phone| 01234567890        |
      | subj | Booking Inquiry    |
      | msg  | I would like a room with a view please. |
    Then I should see a success message for "Jim Beam"

  @regression
  Scenario Outline: Submit form with invalid data should show error
    When I submit the contact form with "<name>", "<email>", "<phone>", "<subject>", "<message>"
    Then I should see an error message on the contact form

    Examples:
      | name | email          | phone       | subject | message                     |
      |      | valid@test.com | 12345678901 | Query   | This has no name            |
      | Jim  | invalid-email  | 12345678901 | Query   | This has an invalid email   |
      | Jim  | valid@test.com | 123         | Query   | This phone is too short     |
      | Jim  | valid@test.com | 12345678901 |         | This has no subject         |
      | Jim  | valid@test.com | 12345678901 | Query   | short                       |
