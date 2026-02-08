Feature: Book a Room
  As a user I want to book a room so that I can stay at the hotel.

  Background:
    Given I am on the booking page

  @ui @smoke
  Scenario: Successful booking
    When I enter "Jim" as first name and "Beam" as last name
    And I click the book button
    Then I should see a booking confirmation
  @regression
  Scenario Outline: Data driven booking for multiple guests
    Given I am on the booking page
    And I open the booking form
    When I enter "<firstName>" as first name and "<lastName>" as last name
    And I click the book button
    Then I should see a booking confirmation

    Examples:
      | firstName | lastName |
      | Alice     | Wonder   |
      | Bob       | Builder  |
      | Charlie   | Chocolate|

  @negative
  Scenario Outline: Submit booking with missing data should show error
    Given I am on the booking page
    And I open the booking form
    When I enter "<firstName>" as first name and "<lastName>" as last name
    And I click the book button
    Then I should see error messages on the booking form

    Examples:
      | firstName | lastName |
      |           | Brown    |
      | Jim       |          |
      |           |          |
